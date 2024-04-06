"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/ContextApi";
import { toast } from "react-toastify";

const Login = () => {
  const { storeInLC } = useAuth();
  const session = useSession();
  const router = useRouter();

  if (session?.data) {
    router.push("/");
  }

  const [user, setUser] = useState({
    email: "",
    password: "",
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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        storeInLC(data.response.isAdmin);
        await signIn("credentials", {
          email: user.email,
          password: user.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
      toast(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogle = async () => {
    await signIn("google", { redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      <main className="wrapper w-full h-full flex items-center justify-center mb-8">
        <form
          className="flex flex-col w-96 mt-20 lg:mt-44 px-6"
          onSubmit={handlesubmit}
        >
          <h1 className="lg:text-4xl text-3xl font-semibold">
            Login to Aexpop
          </h1>
          <label
            htmlFor="email"
            className="lg:mt-12 mt-8 lg:text-xl text-lg font-medium"
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
          <h1 className="lg:text-xl text-md mt-6">
            Don not have an account{" "}
            <Link href="/register" className="color-blue">
              <span className="text-blue-600">Sign Up</span>
            </Link>
          </h1>
          <button
            type="submit"
            className="bg-black text-white py-3 text-xl rounded-md mt-6"
          >
            Sign In
          </button>
          <h1 className="my-5 text-xl lg:text-2xl text-gray-500 font-semibold text-center">
            OR
          </h1>
          <button
            type="button"
            onClick={handleGoogle}
            className="flex items-center justify-center gap-3 border-black border-2 py-2 text-xl rounded-md"
          >
            <FcGoogle className="lg:text-2xl text-xl" />
            <h1 className="lg:text-xl text-lg">Continue with Google</h1>
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
