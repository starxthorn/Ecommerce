"use client";
import Link from "next/link";

const ProItem = (props) => {
  return (
    <>
      <Link href={`/admin/proEdit/${props.id}`} onClick={props.clickOnImg}>
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
            <h1 className="lg:text-lg text-sm text-black font-semibold">
              {props.title.length >= 27
                ? props.title.slice(0, 27) + "..."
                : props.title}
            </h1>
            <h2 className="capitalize text-gray-500 text-sm lg:text-lg mt-1 font-semibold tracking-wide">
              {props.category}
            </h2>
          </div>
          <div className="lg:mt-5 mt-1 flex gap-3">
            <h1 className="line-through text-gray-500 lg:text-xl text-md items-center justify-center text-center">
              {props.oldPrice}
            </h1>
            <h1 className="lg:text-xl text-md font-semibold">
              Rs.{props.newPrice}
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProItem;
