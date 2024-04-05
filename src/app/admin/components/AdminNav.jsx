"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { IoIosHome } from "react-icons/io";
import { useAuth } from "@/app/components/ContextApi";

const AdminNav = () => {
  const pathname = usePathname();
  const { removeinLC } = useAuth();

  return (
    <>
      <main
        className="lg:w-96 lg:border md:border md:border-r-gray-300 lg:border-r-gray-300"
        style={{ height: "100vh" }}
      >
        <ul className="lg:mt-8 mt-3 lg:mx-4 mx-2">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "bg-indigo-500 text-white" : ""
              } transition flex gap-3 items-center justify-start hover:bg-indigo-500 hover:text-white p-3 lg:py-4 rounded-md lg:mt-5 mt-3`}
            >
              <IoIosHome className="lg:text-4xl text-2xl" />
              <h1 className="lg:text-2xl lg:block hidden text-xl font-semibold">
                Home
              </h1>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard"
              className={`${
                pathname === "/admin/dashboard"
                  ? "bg-indigo-500 text-white"
                  : ""
              } transition flex gap-3 items-center justify-start hover:bg-indigo-500 hover:text-white p-3 lg:py-4 rounded-md lg:mt-5 mt-3`}
            >
              <MdOutlineDashboard className="lg:text-4xl text-2xl" />
              <h1 className="lg:text-2xl lg:block hidden text-xl font-semibold">
                Dashboard
              </h1>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className={`${
                pathname === "/admin/users" ? "bg-indigo-500 text-white" : ""
              } transition flex gap-3 items-center justify-start hover:bg-indigo-500 hover:text-white p-3 lg:py-4 rounded-md lg:mt-5 mt-3`}
            >
              <FaUserShield className="lg:text-4xl text-2xl" />
              <h1 className="lg:text-2xl lg:block hidden text-xl font-semibold">
                Customers
              </h1>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products"
              className={`${
                pathname === "/admin/products" ? "bg-indigo-500 text-white" : ""
              } transition flex gap-3 items-center justify-start hover:bg-indigo-500 hover:text-white p-3 lg:py-4 rounded-md lg:mt-5 mt-3`}
            >
              <FaProductHunt className="lg:text-4xl text-2xl" />
              <h1 className="lg:text-2xl lg:block hidden text-xl font-semibold">
                Products
              </h1>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/transiction"
              className={`${
                pathname === "/admin/transiction"
                  ? "bg-indigo-500 text-white"
                  : ""
              } transition flex gap-3 items-center justify-start hover:bg-indigo-500 hover:text-white p-3 lg:py-4 rounded-md lg:mt-5 mt-3`}
            >
              <TfiReload className="lg:text-4xl text-2xl" />
              <h1 className="lg:text-2xl lg:block hidden text-xl font-semibold">
                Transictions
              </h1>
            </Link>
          </li>
          <li>
            <Link
              className={`transition flex gap-3 items-center justify-start hover:bg-indigo-500 hover:text-white p-3 lg:py-4 rounded-md lg:mt-5 mt-3`}
              href="/login"
              onClick={removeinLC}
            >
              <FiLogOut className="lg:text-4xl text-2xl" />
              <h1 className="lg:text-2xl lg:block hidden text-xl font-semibold">
                Log out
              </h1>
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
};

export default AdminNav;
