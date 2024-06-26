"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav";
import Loader from "@/app/components/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const [orderdetails, setOrderdetails] = useState({});
  const router = useRouter();

  const getSingleTrans = async () => {
    try {
      const res = await fetch(`/api/orderDetails?id=${params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setOrderdetails(data.response);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTrans();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/orderDetails?id=${params.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast("Order Deleted");
        router.push("/admin/transiction");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex">
        <AdminNav />
        <div className="lg:m-7 m-5 w-full h-[100vh] flex items-start mt-10 justify-center bg-white rounded-lg">
          {Object.keys(orderdetails)?.length === 0 ? (
            <Loader />
          ) : (
            <>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-300">
                <h1 className="lg:text-xl text-sm font-semibold">
                  Tid: {orderdetails._id}
                </h1>
                <h1 className="lg:text-xl text-sm font-semibold lg:mt-5 mt-3">
                  Products:
                </h1>
                <div className="grid lg:grid-cols-5 grid-cols-2 lg:mt-3 mt-1 gap-3">
                  {orderdetails?.products?.map((data, id) => {
                    return (
                      <>
                        <div className="border border-gray-300 p-2" key={id}>
                          <img
                            src={
                              data?.productId?.images
                                ? data?.productId?.images[0]?.url
                                : ""
                            }
                            alt="product"
                          />
                          <h1 className="lg:text-xl capitalize text-sm font-semibold lg:mt-4 mt-2">
                            {data.productId?.title}
                          </h1>
                          <h1 className="lg:text-xl text-sm mt-2 font-semibold mb-3">
                            {data.productId?.newPrice} x {data.quantityOfPro}
                          </h1>
                        </div>
                      </>
                    );
                  })}
                </div>
                <h1 className="lg:text-xl text-sm font-semibold lg:mt-7 mt-4 capitalize">
                  Name: {orderdetails.user?.name}
                </h1>
                <h1 className="lg:text-xl text-sm font-semibold lg:mt-4 mt-2">
                  Phone No. {orderdetails.user?.phone}
                </h1>
                <h1 className="lg:text-xl text-sm font-semibold lg:mt-4 mt-2">
                  Location: {orderdetails.user?.location}
                </h1>
                <h1 className="lg:text-xl text-sm font-semibold lg:mt-4 mt-2">
                  Total Amount: {orderdetails.totalPrice}
                </h1>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 px-3 py-2 lg:text-xl text-white rounded-md mt-4 text-md"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default page;
