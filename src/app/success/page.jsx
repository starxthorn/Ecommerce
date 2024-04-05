"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/ContextApi";
import Loader from "../components/Loader";

const page = () => {
  const { success } = useAuth();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const handleClick = () => {
    setisLoading(true);
  };

  useEffect(() => {
    if (success === false) {
      router.push("/");
    }
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <section className="flex flex-col justify-center text-center items-center mt-20 lg:gap-4 gap-2">
        <img src="success.png" alt="success" className="w-20" />
        <h1 className="lg:text-4xl font-semibold text-black text-xl">
          Order Placed Successfully
        </h1>
        <h2 className="lg:text-2xl text-md font-semibold text-gray-500">
          Your placed order will reach to you in <br></br> 4-5 days of a weak.
        </h2>
        <Link href="/" onClick={handleClick}>
          <button className="bg-black text-white lg:text-xl text-md lg:p-3 p-2 rounded-lg transition hover:shadow-lg">
            Continue Shopping
          </button>
        </Link>
      </section>
    </>
  );
};

export default page;
