"use client";
import { useAuth } from "@/app/components/ContextApi";
import { usePathname, useRouter } from "next/navigation";
import AdminNav from "../components/AdminNav";
import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const pathname = usePathname();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);

  const handleUsers = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPro = async () => {
    try {
      const res = await fetch("/api/product", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSales = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setSales(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTotal = () => {
    let totalPriceOfProducts = 0;
    sales?.forEach((item) => {
      const { totalPrice } = item;
      totalPriceOfProducts += totalPrice;
    });
    setTotal(totalPriceOfProducts);
  };

  useEffect(() => {
    handleTotal();
  }, [sales]);

  useEffect(() => {
    getAllSales();
  }, []);

  useEffect(() => {
    getAllPro();
  }, []);

  useEffect(() => {
    handleUsers();
  }, []);

  useEffect(() => {
    if (isAdmin === "false" && pathname === "/admin/dashboard") {
      window.location.href = "/";
    }
  }, [isAdmin]);

  return (
    <>
      <main className="flex">
        <AdminNav />
        <section
          className="w-full bg-slate-50"
          style={{ height: "100vh", overflow: "scroll" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 p-5 gap-5">
            <div className="h-24 sm:h-32 border bg-white border-gray-300 w-full flex items-center justify-between rounded-lg p-5">
              <div className="ml-3 flex flex-col gap-1">
                <h1 className="font-semibold text-2xl sm:text-3xl">
                  Rs. {Number(total) || 0}
                </h1>
                <p className="text-gray-500">Total Revenue</p>
              </div>
            </div>
            <div className="h-24 sm:h-32 border bg-white border-gray-300 w-full flex items-center justify-between rounded-lg p-5">
              <div className="ml-3 flex flex-col gap-1">
                <h1 className="font-semibold text-2xl sm:text-3xl">
                  {Number(sales?.length) <= 0
                    ? 0
                    : Number(sales?.length) === 1
                    ? Number(sales?.length)
                    : Number(sales?.length) - 1 + "+"}
                </h1>
                <p className="text-gray-500">Total Sales</p>
              </div>
            </div>
            <div className="h-24 sm:h-32 border bg-white border-gray-300 w-full flex items-center justify-between rounded-lg p-5">
              <div className="ml-3 flex flex-col gap-1">
                <h1 className="font-semibold text-2xl sm:text-3xl">
                  {Number(users?.length) <= 0
                    ? 0
                    : Number(users?.length) === 1
                    ? Number(users?.length)
                    : Number(users?.length) - 1 + "+"}
                </h1>
                <p className="text-gray-500">Total Customers</p>
              </div>
            </div>
            <div className="h-24 sm:h-32 border bg-white border-gray-300 w-full flex items-center justify-between rounded-lg p-5">
              <div className="ml-3 flex flex-col gap-1">
                <h1 className="font-semibold text-2xl sm:text-3xl">
                  {Number(products?.length) <= 0
                    ? 0
                    : Number(products?.length) === 1
                    ? Number(products?.length)
                    : Number(products?.length) - 1 + "+"}
                </h1>
                <p className="text-gray-500">Total Products</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 rounded-lg mx-5">
            <BarChart />
            <div className="h-auto border border-gray-300 rounded-lg bg-white">
              {users
                ?.map((data, id) => {
                  return (
                    <>
                      <div
                        key={id}
                        className="flex items-center justify-between px-4 py-4"
                      >
                        <img
                          src={data?.avatar}
                          className="rounded-full lg:w-14 w-12"
                          alt="user"
                        />
                        <h1 className="capitalize font-semibold lg:text-xl text-md text-black">
                          {data.name}
                        </h1>
                      </div>
                    </>
                  );
                })
                .reverse()
                .slice(0, 5)}
            </div>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 mb-8 gap-5 py-5 bg-white mx-5 p-4 mt-8 border border-gray-300 rounded-lg">
            {products
              ?.map((data, id) => {
                return (
                  <>
                    <Link href={`/admin/proEdit/${data._id}`}>
                      <div className="flex flex-col justify-start items-start lg:p-3 p-1 gap-2 lg:border lg:border-gray-200 rounded-lg">
                        <img
                          src={
                            data.images
                              ? data.images[0]?.url
                              : "https://dummyimage.com/400x400"
                          }
                          alt={data.title}
                        />
                        <div className="lg:mt-2 mt-1 flex flex-col">
                          <h1 className="lg:text-lg text-sm text-black font-semibold">
                            {data.title.length >= 27
                              ? data.title.slice(0, 27) + "..."
                              : data.title}
                          </h1>
                          <h2 className="capitalize text-gray-500 text-sm lg:text-lg mt-1 font-semibold tracking-wide">
                            {data.category}
                          </h2>
                        </div>
                        <div className="lg:mt-5 mt-1 flex gap-3">
                          <h1 className="line-through text-gray-500 lg:text-xl text-md items-center justify-center text-center">
                            {data.oldPrice}
                          </h1>
                          <h1 className="lg:text-xl text-md font-semibold">
                            Rs.{data.newPrice}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })
              .reverse()
              .slice(0, 5)}
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
