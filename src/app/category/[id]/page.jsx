"use client";
import { useAuth } from "@/app/components/ContextApi";
import React, { useEffect, useState } from "react";
import Item from "@/app/components/Item";
import Loader from "@/app/components/Loader";

const page = ({ params }) => {
  const { products } = useAuth();
  const [catProducts, setCatProducts] = useState();

  useEffect(() => {
    setCatProducts(
      products.filter((data) => {
        return data.category === params.id;
      })
    );
  }, [products]);

  return (
    <>
      {products.length === 0 || !catProducts ? (
        <Loader />
      ) : (
        <>
          <section className="container mt-5 mx-auto lg:px-3 px-2 grid grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-3">
            {catProducts?.map((data, id) => {
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
          </section>
        </>
      )}
    </>
  );
};

export default page;
