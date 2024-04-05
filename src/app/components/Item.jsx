"use client";
import React from "react";
import Link from "next/link";

const Item = (props) => {
  return (
    <>
      {/* <div key={props.keyId}>
        <Link
          href={`/productdetails/${props.id}`}
          className="block relative h-32 lg:h-48 md:h-36 rounded overflow-hidden"
        >
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block rounded-lg"
            src={
              props.image
                ? props.image[0]?.url
                : "https://dummyimage.com/400x400"
            }
          />
        </Link>
        <div className="mt-2 flex flex-col items-start">
          <h2 className="lg:mt-2 text-gray-900 title-font text-md lg:text-xl font-medium">
            {props.title}
          </h2>
          <h3 className="lg:mt-2 mt-1 capitalize bg-slate-50 border border-gray-200 lg:px-3 px-2 pt-1 pb-1 rounded-md text-gray-600 text-xs font-medium tracking-widest mb-1">
            {props.category}
          </h3>
          <div
            className={`lg:mt-2 mt-1 flex items-center justify-start ${
              props.oldPrice <= 0 ? "" : "lg:gap-4 gap-2"
            }`}
          >
            <p className="line-through lg:text-lg text-md text-gray-500">
              {props.oldPrice <= 0 ? <></> : props.oldPrice}
            </p>
            <p className="text-indigo-500 lg:text-xl text-lg font-semibold">
              Rs.{props.newPrice}
            </p>
          </div>
        </div>
      </div> */}
      <Link href={`/productdetails/${props.id}`}>
        <div className="flex flex-col justify-start items-start lg:p-3 p-1 gap-2 lg:border lg:border-gray-200 rounded-lg">
          <img
            src={
              props.image
                ? props.image[0]?.url
                : "https://dummyimage.com/400x400"
            }
            alt={props.title}
          />
          <div className="lg:mt-2 mt-1 flex flex-col">
            <h1 className="lg:text-lg capitalize text-sm text-black font-semibold">
              {props.title.length >= 27
                ? props.title.slice(0, 25) + "..."
                : props.title}
            </h1>
            <h2 className="capitalize text-gray-500 text-sm lg:text-lg mt-1 font-semibold tracking-wide">
              {props.category}
            </h2>
          </div>
          <div className="lg:mt-5 mt-1 flex gap-3">
            <h1 className="line-through text-gray-500 lg:text-xl text-sm items-center justify-center text-center">
              {props.oldPrice}
            </h1>
            <h1 className="lg:text-xl text-sm font-semibold">
              Rs.{props.newPrice}
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Item;
