"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/ContextApi";
import Loader from "@/app/components/Loader";

const page = ({ params }) => {
  const [user, setUser] = useState({});
  const { removeinLC, isAdmin } = useAuth();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const handleClick = () => {
    setisLoading(true);
  };

  const getUser = async () => {
    try {
      const res = await fetch(`/api/finduserEmail?email=${params.email}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setUser(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return Object.keys(user)?.length === 0 || isLoading ? (
    <Loader />
  ) : (
    <>
      <main className="wrapper w-full h-full flex items-center justify-center mb-8">
        <section className="flex flex-col w-96 mt-8 px-4">
          <label htmlFor="name" className="text-xl mt-4">
            Name
          </label>
          <h1 className="bg-gray-50 text-gray-500 border border-gray-300 rounded-md p-3 text-xl mt-2">
            {user.name}
          </h1>
          <label htmlFor="email" className="text-xl mt-4">
            Email
          </label>
          <h1 className="bg-gray-50 text-gray-500 border border-gray-300 rounded-md p-3 text-xl mt-2">
            {user.email}
          </h1>
          <label htmlFor="location" className="text-xl mt-4">
            Location
          </label>
          <h1 className="bg-gray-50 text-gray-500 border border-gray-300 rounded-md p-3 text-xl mt-2">
            {user.location}
          </h1>
          <label htmlFor="phone" className="text-xl mt-4">
            Phone No
          </label>
          <h1 className="bg-gray-50 text-gray-500 border border-gray-300 rounded-md p-3 text-xl mt-2">
            {user.phone}
          </h1>
          <div>
            <Link href={`/updateProfile/${user._id}`} onClick={handleClick}>
              <button className="w-full bg-black text-white py-3 text-xl rounded-md mt-10">
                Update User
              </button>
            </Link>
            {isAdmin === "true" ? (
              <>
                <Link href="/admin/dashboard" onClick={handleClick}>
                  <button className="w-full bg-indigo-500 transiton hover:bg-indigo-400 text-white py-3 text-xl rounded-md mt-3">
                    Admin Dashboard
                  </button>
                </Link>
              </>
            ) : (
              <></>
            )}
            <button
              onClick={removeinLC}
              className="bg-red-500 w-full transition hover:bg-red-400 text-xl py-3 rounded-md mt-3 text-white"
            >
              Log out
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
