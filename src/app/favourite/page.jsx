"use client";
import React, { Suspense, lazy } from "react";
import { useAuth } from "../components/ContextApi";
import Link from "next/link";
const Item = lazy(() => import("../components/Item"));
import Loader from "../components/Loader";

const page = () => {
  const { fav } = useAuth();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <section className="text-gray-600 body-font">
          <div className="container px-3 lg:py-24 pt-8 mx-auto">
            <div className="grid lg:grid-cols-4 gap-5 grid-cols-2 md:grid-cols-3">
              {fav && fav.length > 0 ? (
                fav.map((data, id) => {
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
              ) : (
                <></>
              )}
            </div>
            {fav.length <= 0 ? (
              <>
                <section className="flex flex-col justify-center text-center items-center gap-4">
                  <img src="empty-cart.jpg" alt="success" className="w-52" />
                  <h1 className="lg:text-4xl font-semibold text-black text-2xl">
                    Your Wishlist section is empty
                  </h1>
                  <h2 className="lg:text-2xl text-xl font-semibold text-gray-500">
                    Add products in the wishlist section which you <br></br>{" "}
                    want to buy in future
                  </h2>
                  <Link href="/">
                    <button className="bg-black text-white lg:text-xl text-lg p-3 rounded-lg transition hover:shadow-lg">
                      Continue Shopping
                    </button>
                  </Link>
                </section>
              </>
            ) : (
              <></>
            )}
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default page;
