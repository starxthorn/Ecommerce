"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = ({ params }) => {
  const router = useRouter();
  const [upadateUser, setUpdateuser] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
  });

  const getCurrentUser = async () => {
    try {
      const res = await fetch(`/api/user?id=${params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setUpdateuser({
          name: data.response.name,
          email: data.response.email,
          location: data.response.location,
          phone: data.response.phone,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handlechange = (e) => {
    setUpdateuser({
      ...upadateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user?id=${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upadateUser),
      });
      const data = await res.json();
      if (res.ok) {
        setUpdateuser({
          name: data.response.name,
          email: data.response.email,
          location: data.response.location,
          phone: data.response.phone,
        });
        router.push(`/profile/${upadateUser.email}`);
      }
      toast(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="wrapper w-full h-full flex items-center justify-center mb-8">
        <form className="flex flex-col w-96 mt-14 px-4" onSubmit={handlesubmit}>
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Update User Profile
          </h1>
          <label htmlFor="name" className="mt-9 text-xl font-medium">
            Name
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            name="name"
            value={upadateUser.name}
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label htmlFor="email" className="mt-6 text-xl font-medium">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="off"
            name="email"
            value={upadateUser.email}
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label htmlFor="location" className="mt-6 text-xl font-medium">
            Location
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            name="location"
            value={upadateUser.location}
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label htmlFor="location" className="mt-6 text-xl font-medium">
            Phone No
          </label>
          <input
            type="number"
            required
            autoComplete="off"
            name="phone"
            value={upadateUser.phone}
            onChange={handlechange}
            className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 text-xl rounded-md mt-6"
          >
            Save Changes
          </button>
        </form>
      </main>
    </>
  );
};

export default page;
