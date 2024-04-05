"use client";
import { useAuth } from "@/app/components/ContextApi";
import Loader from "@/app/components/Loader";
import React, { useEffect, useRef, useState } from "react";

const page = ({ params }) => {
  const imageRef = useRef();
  const [productdetails, setProductdetails] = useState({});
  const { handleremoveheart, hanldeaddfav, fav, handleAddToCart, cart } =
    useAuth();
  const [image, setImage] = useState(productdetails.images);
  const [quantity, setQuantity] = useState(1);
  // const [isLoading, setisLoading] = useState(false);

  const getDetails = async () => {
    try {
      const res = await fetch(`/api/productdetails?id=${params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProductdetails(data.response);
        setImage(data.response.images);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handlechangeMainImage = (img) => {
    imageRef.current.src = img;
  };

  const handleincrease = () => {
    quantity < productdetails.stock
      ? setQuantity(quantity + 1)
      : setQuantity(productdetails.stock);
  };

  const handledecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  return Object.keys(productdetails)?.length === 0 ? (
    <Loader />
  ) : (
    <>
      <section className="text-gray-600">
        <div className="container px-3 lg:py-14 mt-3 lg:mt-0 mx-auto pb-5">
          <div className="flex flex-col lg:flex-row items-start justify-center lg:gap-8">
            <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col justify-center items-center">
              <img
                ref={imageRef}
                alt="ecommerce"
                // lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg
                className="w-full lg:h-auto object-cover object-center rounded-lg"
                src={image ? image[0].url : "https://dummyimage.com/400x400"}
              />
              <div className="flex gap-1 mt-2">
                {image ? (
                  image.map((Img) => {
                    return (
                      <>
                        <a
                          key={Img._id}
                          className="inline-block lg:mt-4 border border-gray-200 p-1 rounded-md hover:border-indigo-500 cursor-pointer"
                          onClick={() => handlechangeMainImage(Img.url)}
                        >
                          <img
                            alt="ecommerce"
                            className="w-16 lg:w-20"
                            src={
                              image ? Img.url : "https://dummyimage.com/400x400"
                            }
                          />
                        </a>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div
              // style={{ width: "40rem" }}
              className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
            >
              <h1 className="text-gray-900 capitalize text-xl lg:text-3xl title-font font-semibold mb-1">
                {productdetails.title}
              </h1>
              <h2 className="capitalize mt-2 lg:ml-1 text-gray-500 lg:text-lg text-sm font-semibold">
                {productdetails.category}
              </h2>
              <h1 className="leading-relaxed lg:text-lg text-md mb-6 mt-4 flex flex-wrap">
                {productdetails.description}
              </h1>
              <div
                className={`flex ${
                  productdetails.stock <= 0 ? "hidden" : ""
                } lg:gap-3 gap-2 justify-start items-center mt-3`}
              >
                <h2
                  onClick={handledecrease}
                  className="bg-gray-50 border cursor-pointer border-gray-300 rounded-md p-1 lg:px-4 px-3 lg:text-lg text-md"
                >
                  -
                </h2>
                <h2 className="text-black px-2 pt-1 text-xl text-center">
                  {quantity}
                </h2>
                <h2
                  onClick={handleincrease}
                  className="bg-gray-50 border cursor-pointer border-gray-300 rounded-md p-1 lg:px-4 px-3 lg:text-lg text-md"
                >
                  +
                </h2>
              </div>
              <div className="mt-8 flex items-start justify-start">
                {productdetails?.stock >= 1 ? (
                  <>
                    <h1 className="rounded-md border border-green-500 lg:text-lg font-semibold text-green-600 bg-green-200 p-1 px-2">
                      In Stock
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="rounded-md border border-red-500 lg:text-lg font-semibold text-red-600 bg-red-200 p-1 px-2">
                      Out of Stock
                    </h1>
                  </>
                )}
              </div>
              <div
                className={`flex items-center justify-start my-10 ${
                  productdetails.oldPrice === 0 ||
                  productdetails.oldPrice === "0"
                    ? ""
                    : "lg:gap-5 gap-3"
                }`}
              >
                <h1 className="text-gray-500 line-through lg:text-3xl text-xl">
                  {productdetails.oldPrice === 0 ||
                  productdetails.oldPrice === "0" ? (
                    <></>
                  ) : (
                    productdetails.oldPrice
                  )}
                </h1>
                <h1 className="text-black lg:text-3xl text-xl font-semibold">
                  Rs.{productdetails.newPrice}
                </h1>
              </div>
              <div className="flex gap-5 flex-col justify-center items-center mt-7">
                <button
                  disabled={
                    cart
                      .map((item) => item.product._id)
                      .indexOf(productdetails._id) !== -1 ||
                    productdetails?.stock <= 0
                  }
                  onClick={() => handleAddToCart(productdetails, quantity)}
                  className={`lg:text-xl text-lg lg:py-5 py-3 border-2 disabled:opacity-80 border-black bg-black text-white rounded-full w-full `}
                >
                  Add to Cart
                </button>
                {fav.map((item) => item._id).indexOf(productdetails._id) !==
                -1 ? (
                  <>
                    <button
                      onClick={() => handleremoveheart(productdetails)}
                      className="font-semibold text-black border-2 lg:text-xl text-lg lg:py-5 py-3 border-black rounded-full w-full"
                    >
                      Remove from Wishlist
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => hanldeaddfav(productdetails)}
                      className="font-semibold text-black border-2 lg:text-xl text-lg lg:py-5 py-3 border-black rounded-full w-full"
                    >
                      Add to Wishlist
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
