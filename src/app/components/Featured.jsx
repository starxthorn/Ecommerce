"use client";
import React, { Suspense, lazy, useEffect, useState } from "react";
const Item = lazy(() => import("../components/Item"));
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import Loader from "./Loader";

const Featured = () => {
  const [Featured, setFeatured] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/product", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        // setFeatured(data.response);
        setFeatured(
          data.response.filter((item) => {
            return item.featured === true;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <section className="flex flex-col lg:my-12 mt-5 container py-5 mx-auto px-3">
        <div className="flex items-center justify-center text-center flex-col lg:gap-4 gap-2">
          <h1 className="text-black lg:text-5xl text-3xl font-bold">
            Featured Products Here
          </h1>
          <h2 className="text-black lg:text-xl text-sm mt-2">
            Aexpop offers you the best tech products whole over the Pakistan
            with guarante <br></br> Best condition products and new products are
            also available
          </h2>
        </div>
        <Suspense fallback={<Loader />}>
          <div className="lg:mt-12 mt-8 lg:px-3 px-2 grid lg:gap-4 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Featured?.slice(-8)
              .map((data, id) => {
                return (
                  <Item
                    id={data._id}
                    keyId={id}
                    title={data.title}
                    category={data.category}
                    oldPrice={data.oldPrice}
                    newPrice={data.newPrice}
                    image={data.images}
                  />
                );
              })
              .reverse()}
          </div>
        </Suspense>
        <Link
          href="/products"
          className="flex lg:my-12 mt-10 mb-10 text-center justify-center items-center"
        >
          <h1 className="lg:text-2xl text-xl text-indigo-700 text-center">
            More
          </h1>
          <MdOutlineKeyboardArrowRight className="text-3xl font-semibold text-indigo-700" />
        </Link>
      </section>
    </>
  );
};

export default Featured;
