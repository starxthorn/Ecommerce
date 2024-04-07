"use client";
import React, { Suspense, lazy, useEffect, useState } from "react";
const Item = lazy(() => import("../components/Item"));
import { useAuth } from "../components/ContextApi";
import Loader from "../components/Loader";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const page = () => {
  const { handlesearch, products, filteredProducts } = useAuth();
  const { searchValue } = useAuth();
  const [filter, setfilter] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const productsPerPage = 8;
  const router = useRouter();

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

  const getAllcategories = async () => {
    try {
      const res = await fetch(`/api/category`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setCategory(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcategories();
  }, []);

  return (
    <>
      {category.length === 0 ? (
        <Loader />
      ) : (
        <>
          <section className="container mx-auto flex flex-col justify-center gap-12 lg:mt-12 mt-3 items-start">
            <div className="w-full flex flex-col items-center justify-between px-3">
              <div className="flex w-full items-center justify-center">
                <FaArrowLeft
                  className="mr-3 cursor-pointer lg:text-3xl text-gray-500 transition hover:text-black text-2xl"
                  onClick={() => router.back()}
                />
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchValue}
                  className="w-full border border-gray-300 rounded-md py-2 lg:pl-3 pl-2 lg:text-xl text-lg outline-none"
                  onChange={handlesearch}
                />
              </div>
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
                {category?.map((data, id) => {
                  return (
                    <>
                      <button
                        key={id}
                        onClick={() => handlefilter(data.name)}
                        className={`border lg:text-lg text-sm ${
                          filter === data.name
                            ? "bg-black border-black text-white"
                            : "bg-white text-black"
                        } border-gray-300 capitalize cursor-pointer p-1 px-3 rounded-md`}
                      >
                        {data.name}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
            <Suspense fallback={<Loader />}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:px-0 px-2 mb-10">
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
      )}
    </>
  );
};

export default page;
