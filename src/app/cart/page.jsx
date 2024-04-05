"use client";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../components/ContextApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const page = () => {
  const { cart, handleremovecart, setCart, setSuccess } = useAuth();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const session = useSession();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const handleClick = () => {
    setisLoading(true);
  };

  useEffect(() => {
    if (!session?.data) {
      router.push("/login");
    }
  }, []);

  const handleUser = async () => {
    try {
      const res = await fetch(
        `/api/finduserEmail?email=${session?.data?.user?.email}`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  const handleTotal = () => {
    let totalPrice = 0;
    cart?.forEach((item) => {
      const { product, quantity } = item;
      let productPrice = product.newPrice;
      totalPrice += productPrice * quantity;
    });
    setTotal(totalPrice);
  };

  useEffect(() => {
    handleTotal();
  }, [cart]);

  const requestBody = {
    products: cart.map((item) => ({
      productId: item.product._id, // Assuming you have product ID in the product object
      quantityOfPro: item.quantity,
    })),
    totalPrice: total, // Define a function to calculate total price based on cart items
    user: user?._id,
  };

  const hanldePlaceOrder = async () => {
    try {
      for (const item of cart) {
        const productId = item.product._id;
        const quantity = item.quantity;
        await fetch(`/api/product?id=${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: item.product.stock - quantity,
          }),
        });
      }
      const res = await fetch(`/api/orders?id=${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      if (res.ok) {
        // console.log(data);
        setCart([]);
        setSuccess(true);
        router.push("/success");
        return localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const errorMessage = () => {
    router.push(`/profile/${session?.data?.user?.email}`);
    toast("Enter the credentials");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <section className="w-full container mx-auto lg:mt-14 mt-10 lg:gap-24 flex flex-col justify-center items-center">
        {cart?.length <= 0 ? (
          <>
            <div className="lg:mt-16 mt-10 flex flex-col lg:gap-4 gap-2 md:gap-3 text-center items-center justify-center px-5">
              <img src="/cart.png" className="w-32 lg:w-60 md:54" alt="" />
              <h1 className="lg:text-3xl md:text-xl text-2xl font-semibold">
                Cart is Empty
              </h1>
              <p className="lg:w-96 md:w-54 lg:text-xl text-md">
                Your cart is empty please add products to the cart to checkout
              </p>
              <Link href="/products" onClick={handleClick}>
                <button className="text-white p-3 px-4 rounded-lg bg-black text-xl transition hover:shadow-lg">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 w-full">
              {cart && cart.length >= 1 ? (
                cart?.map((data, id) => {
                  return (
                    <>
                      <div
                        className="flex p-3 items-start justify-between"
                        key={id}
                      >
                        <div className="flex gap-4 items-start justify-center">
                          <img
                            className="lg:w-48 w-24"
                            src={
                              data?.product?.images
                                ? data?.product?.images[0]?.url
                                : ""
                            }
                            alt={data.product.title}
                          />
                          <div>
                            <h1 className="text-black capitalize font-semibold text-md lg:text-2xl">
                              {data.product.title}
                            </h1>
                            <h2 className="lg:mt-2 mt-1 text-gray-500 font-semibold text-md lg:text-xl">
                              {data.product.newPrice} x {data.quantity}
                            </h2>
                          </div>
                        </div>
                        <div>
                          <IoClose
                            onClick={() => handleremovecart(data.product)}
                            className="cursor-pointer text-gray-600 hover:text-black text-xl lg:text-3xl"
                          />
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="lg:w-1/4 w-full lg:mt-10 lg:mb-10 mt-10 bg-gray-50 border border-gray-300 lg:rounded-lg p-5 lg:self-end md:self-center self-center">
              <h1 className="text-2xl text-black font-semibold">
                Total Summary
              </h1>
              <h2 className="text-gray-600 lg:text-lg text-sm mt-3 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, sed veniam dolorem illo officia id cupiditate atque
                tempora debitis amet quisquam at recusandae consequatur
                distinctio!
              </h2>
              <div className="flex items-center justify-between mt-7 px-2">
                <h1 className="text-black lg:text-2xl text-xl font-semibold">
                  Total{" "}
                </h1>
                <h1 className="lg:text-2xl text-xl text-black font-semibold">
                  Rs. {total === 0 ? 0 : total}
                </h1>
              </div>
              <button
                onClick={
                  user?.location === "" || user?.phone === ""
                    ? errorMessage
                    : hanldePlaceOrder
                }
                className="w-full py-4 text-2xl text-white rounded-full transition hover:shadow-lg bg-black mt-7"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default page;
