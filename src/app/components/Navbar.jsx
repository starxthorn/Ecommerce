"use client";
import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { useAuth } from "./ContextApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../globals.css";
import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  const session = useSession();
  const pathname = usePathname();
  const { isAdmin, fav, cart } = useAuth();
  const [category, setCategory] = useState([]);
  const [menu, setMenu] = useState(false);

  const getAllcategories = async () => {
    try {
      const res = await fetch(`/api/category`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setCategory(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcategories();
  }, []);

  return pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/success" ||
    pathname === "/products" ||
    pathname.startsWith("/productdetails") ? (
    <></>
  ) : (
    <>
      <header className="container relative mx-auto flex items-center justify-between px-3 py-4">
        <div className="flex items-center gap-2 justify-center">
          <IoMenu
            onClick={() => setMenu(true)}
            className="lg:hidden text-2xl cursor-pointer"
          />
          <Link href="/">
            <h1 className="lg:text-4xl text-2xl font-semibold">Stall Mart</h1>
          </Link>
        </div>
        <div
          className={`lg:flex ${menu ? "menu-bar py-5 pt-7" : ""} items-center justify-center hidden lg:gap-6 gap-3 capitalize`}
        >
          <IoMenu className="absolute lg:hidden left-3 text-2xl top-6" onClick={() => setMenu(false)} />
          {category 
            ?.map((data, id) => {
              return (
                <>
                  <Link href={`/category/${data.name}`} key={id} onClick={() => setMenu(false)}>
                    <h1 className="text-gray-600 transition hover:text-black lg:text-xl text-md font-semibold">
                      {data.name}
                    </h1>
                  </Link>
                </>
              );
            })
            .slice(0, 5)}
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-4">
            <Link href="/favourite" className="relative">
              <li>
                <IoMdHeartEmpty className="lg:text-4xl mt-1 text-3xl text-gray-600 hover:text-black transition" />
                {fav.length >= 1 ? (
                  <>
                    <div className="bg-red-500 w-3 h-3 rounded-full absolute top-1 right-0"></div>
                  </>
                ) : (
                  <></>
                )}
              </li>
            </Link>
            <Link href={`/cart`} className="relative">
              <li>
                <IoBagHandleOutline className="lg:text-4xl text-3xl text-gray-600 hover:text-black transition" />
                {cart.length >= 1 ? (
                  <>
                    <div className="bg-red-500 lg:w-5 lg:h-5 w-4 h-4 text-xs lg:text-sm text-center items-center justify-center flex font-semibold rounded-full absolute top-0 -right-1 text-white">
                      {cart.length}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </li>
            </Link>
            {session.data ? (
              <>
                <Link href={`/profile/${session?.data?.user?.email}`}>
                  <li>
                    <img
                      className="cursor-pointer lg:mt-1 lg:w-12 lg:h-12 w-10 h-10 rounded-full"
                      src={session?.data?.user?.image || "pngwing.com.png"}
                      alt="user"
                    />
                  </li>
                </Link>
              </>
            ) : session.status === "loading" ? (
              <>
                <div className="loading w-10 h-10 rounded-full"></div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-black bg-gray-50 px-3 py-1 text-lg rounded-md lg:px-4 lg:text-xl lg:py-2 border border-gray-300">
                    Login
                  </button>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   fill="none"
//   stroke="currentColor"
//   strokeLinecap="round"
//   strokeLinejoin="round"
//   strokeWidth="2"
//   className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
//   viewBox="0 0 24 24"
// >
//   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
// </svg>
