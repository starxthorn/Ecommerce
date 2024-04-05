"use client";
import React from "react";
import Link from "next/link";

const Trans = (props) => {
  return (
    <>
      <Link href={`/admin/transictionDetails/${props.tid}`} onClick={props.clickOnImg} >
        <div
          key={props.id}
          className="bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 px-3 items-center justify-between rounded-md border border-gray-300 py-5"
        >
          <h1 className="rounded-md p-1 text-xs text-black font-semibold px-3">
            Order Id: {props.tid}
          </h1>
          <h1 className="rounded-md p-1 text-xs text-black font-semibold px-3">
            Username: {props.name}
          </h1>
          <h1 className="rounded-md p-1 text-xs text-black font-semibold px-3">
            Location: {props.location}
          </h1>
          <h1 className="rounded-md p-1 text-xs text-black font-semibold px-3">
            Phone: {props.phone}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default Trans;
