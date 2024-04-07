"use client";
import React, { Suspense } from "react";
import { useAuth } from "./ContextApi";
import Loader from "./Loader";
import Item from "./Item";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Products = () => {
  const { products } = useAuth();
  const router = useRouter();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <section className="flex flex-col lg:my-8 mt-3 container py-5 mx-auto px-3">
          <div className="flex items-center justify-center text-center flex-col lg:gap-4 gap-2">
            <h1 className="text-black lg:text-5xl text-3xl font-bold">
              Just For You
            </h1>
            <h2 className="text-black lg:text-xl text-sm mt-2">
              Stall Mart offers you the best tech products whole over the
              Pakistan with guarante <br></br> Best condition products and new
              products are also available
            </h2>
          </div>
          <div className="lg:mt-12 mt-8 lg:px-3 px-2 grid lg:gap-4 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              ?.slice(-12)
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
          <Link
            href="/products"
            onClick={() => router.push("/products")}
            className="flex lg:my-12 mt-10 mb-10 text-center justify-center items-center"
          >
            <h1 className="lg:text-2xl text-xl text-indigo-700 text-center">
              More
            </h1>
            <MdOutlineKeyboardArrowRight className="text-3xl font-semibold text-indigo-700" />
          </Link>
        </section>
      </Suspense>
    </>
  );
};

export default Products;
