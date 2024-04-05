"use client";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
// import Item from "../components/Item";
const Item = lazy(() => import("../components/Item"));
import { IoArrowBackSharp } from "react-icons/io5";
import { useAuth } from "../components/ContextApi";
import Loader from "../components/Loader";

const page = () => {
  const { handlesearch, products, filteredProducts } = useAuth();
  const { searchValue } = useAuth();
  const [filter, setfilter] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState([]);
  const productsPerPage = 8;

  const handlefilter = (cat) => {
    setfilter(cat);
  };

  const CatFilteredProducts =
    filter === "all"
      ? products
      : products.filter((item) => item.category === filter);

  useEffect(() => {
    setVisibleProducts(products.slice(0, productsPerPage));
  }, [products]);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      const nextPageProducts = products.slice(
        visibleProducts.length,
        visibleProducts.length + productsPerPage
      );
      setVisibleProducts((prevProducts) => [
        ...prevProducts,
        ...nextPageProducts,
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleProducts, products]);

  return (
    <>
      <section className="container mx-auto flex flex-col justify-center gap-12 lg:mt-12 mt-7 items-start">
        <div className="w-full flex flex-col items-center justify-between px-3">
          <input
            type="text"
            placeholder="Search here"
            value={searchValue}
            className="w-full border border-gray-300 rounded-md py-2 lg:pl-3 pl-2 lg:text-xl text-lg outline-none"
            onChange={handlesearch}
          />
          <div className="flex mt-5 gap-2 flex-wrap">
            <button
              onClick={() => handlefilter("all")}
              className={`border lg:text-lg text-sm ${
                filter === "all"
                  ? "bg-black border-black text-white"
                  : "bg-white text-black"
              } border-gray-300 cursor-pointer p-1 px-3 rounded-md`}
            >
              All
            </button>
            <button
              onClick={() => handlefilter("mobiles")}
              className={`border lg:text-lg text-sm ${
                filter === "mobiles"
                  ? "bg-black border-black text-white"
                  : "bg-white text-black"
              } border-gray-300 cursor-pointer p-1 px-3 rounded-md`}
            >
              Mobiles
            </button>
            <button
              onClick={() => handlefilter("laptops")}
              className={`border lg:text-lg text-sm ${
                filter === "laptops"
                  ? "bg-black border-black text-white"
                  : "bg-white text-black"
              } border-gray-300 cursor-pointer p-1 px-3 rounded-md`}
            >
              Laptops
            </button>
            <button
              onClick={() => handlefilter("processors")}
              className={`border lg:text-lg text-sm ${
                filter === "processors"
                  ? "bg-black border-black text-white"
                  : "bg-white text-black"
              } border-gray-300 cursor-pointer p-1 px-3 rounded-md`}
            >
              Processors
            </button>
            <button
              onClick={() => handlefilter("motherboards")}
              className={`border lg:text-lg text-sm ${
                filter === "motherboards"
                  ? "bg-black border-black text-white"
                  : "bg-white text-black"
              } border-gray-300 cursor-pointer p-1 px-3 rounded-md`}
            >
              Motherboards
            </button>
            <button
              onClick={() => handlefilter("cables")}
              className={`border lg:text-lg text-sm ${
                filter === "cables"
                  ? "bg-black border-black text-white"
                  : "bg-white text-black"
              } border-gray-300 cursor-pointer p-1 px-3 rounded-md`}
            >
              Cables
            </button>
            <button
              onClick={() => handlefilter("graphic cards")}
              className={`border lg:text-lg text-sm ${
                filter === "graphic cards"
                  ? "bg-black border-black text-white"
                  : "bg-white text-black"
              } border-gray-300 cursor-pointer p-1 px-3 rounded-md`}
            >
              Graphic Cards
            </button>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:px-0 px-2 mb-10">
            {searchValue === ""
              ? filter === "all"
                ? visibleProducts.map((data, id) => {
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
                : CatFilteredProducts.map((data, id) => {
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
              : filteredProducts?.map((data, id) => {
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
                })}
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default page;
