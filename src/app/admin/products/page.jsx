"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import ProItem from "../components/ProItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/components/ContextApi";
import Loader from "@/app/components/Loader";

const page = () => {
  const [products, setProducts] = useState([]);
  const { isAdmin } = useAuth();
  const pathname = usePathname();
  const [isLoading, setisLoading] = useState(false);

  const handleClick = () => {
    setisLoading(true);
  };

  useEffect(() => {
    console.log(isAdmin);
    if (isAdmin === "false" && pathname === "/admin/products") {
      window.location.href = "/";
    }
  }, [isAdmin]);

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/product", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  });

  return (
    <>
      <main className="flex">
        <AdminNav />
        <section
          className="w-full bg-white"
          style={{ height: "100vh", overflow: "scroll" }}
        >
          <div className="w-full flex gap-4 px-4 lg:justify-end justify-center lg:px-8 my-5 items-center">
            <Link href="/admin/newPro">
              <button
                onClick={handleClick}
                className="lg:px-4 px-3 bg-indigo-500 py-3 lg:text-xl text-md hover:bg-indigo-400 transition rounded-md text-white"
              >
                New Product
              </button>
            </Link>
            <Link href="/admin/category">
              <button
                onClick={handleClick}
                className="lg:px-4 px-3 bg-indigo-500 py-3 lg:text-xl text-md hover:bg-indigo-400 transition rounded-md text-white"
              >
                New Category
              </button>
            </Link>
          </div>
          {products?.length === 0 || isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="lg:mt-0 mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 lg:mx-8 mx-4">
                {products
                  ?.map((data, id) => {
                    return (
                      <ProItem
                        id={data._id}
                        clickOnImg={handleClick}
                        key={id}
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
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default page;
