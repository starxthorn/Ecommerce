"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phone: "",
  });

  const handlechange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        setUser("");
        router.push("/login");
      }
      console.log(data);
      toast(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="wrapper w-full h-full flex items-center justify-center mb-8">
        <form
          className="flex flex-col w-96 mt-20 lg:mt-28 px-5"
          onSubmit={handlesubmit}
        >
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Register to Aexpop
          </h1>
          <label htmlFor="name" className="mt-9 lg:text-xl text-lg font-medium">
            Name
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            name="name"
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label
            htmlFor="email"
            className="mt-6 lg:text-xl text-lg font-medium"
          >
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="off"
            name="email"
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label
            htmlFor="password"
            className="mt-6 lg:text-xl text-lg font-medium"
          >
            Password
          </label>
          <input
            type="password"
            required
            autoComplete="off"
            name="password"
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label
            htmlFor="location"
            className="mt-6 lg:text-xl text-lg font-medium"
          >
            Location
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            name="location"
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label
            htmlFor="location"
            className="mt-6 lg:text-xl text-lg font-medium"
          >
            Phone No
          </label>
          <input
            type="number"
            required
            autoComplete="off"
            name="phone"
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <h1 className="lg:text-xl text-lg mt-6">
            Have an account{" "}
            <Link href="/login" className="color-blue">
              <span className="text-blue-600">Sign In</span>
            </Link>
          </h1>
          <button
            type="submit"
            className="bg-black text-white py-3 text-xl rounded-md mt-6"
          >
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
};

export default page;
