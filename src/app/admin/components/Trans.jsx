"use client";
import React from "react";
import Link from "next/link";

const Trans = (props) => {
  return (
    <>
      <Link
        href={`/admin/transictionDetails/${props.tid}`}
        onClick={props.clickOnImg}
        className="w-full bg-gray-50 gap-4 rounded-md mb-5 py-4 border border-gray-300 lg:items-center lg:text-center px-3 my-4 grid grid-cols-1 lg:grid-cols-4 justify-between"
      >
        <h1 className="text-black font-semibold text-xs">TID: {props.tid}</h1>
        <h1 className="text-black font-semibold text-xs">Name: {props.name}</h1>
        <h1 className="text-black font-semibold text-xs">
          Location: {props.location}
        </h1>
        <h1 className="text-black font-semibold text-xs">
          Phone: {props.phone}
        </h1>
      </Link>
    </>
  );
};

export default Trans;
