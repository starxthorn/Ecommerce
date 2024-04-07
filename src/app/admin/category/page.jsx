"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loader from "@/app/components/Loader";

const page = () => {
  const [add, setAdd] = useState({
    name: "",
  });
  const [Allcat, setAllCat] = useState([]);

  const getAllCategories = async () => {
    try {
      const res = await fetch("/api/category", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setAllCat(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const Addcategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(add),
      });
      if (res.ok) {
        toast("Category Added");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIndex = async (id) => {
    try {
      const res = await fetch(`/api/category?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast("Category Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex">
        <AdminNav />
        <section className="lg:p-5 p-1 bg-gray-50 text-black w-full lg:px-5 px-3">
          <form
            onSubmit={Addcategory}
            className="flex flex-col mt-5 lg:gap-6 gap-3"
          >
            <h1 className="lg:text-3xl md:text-xl hidden lg:block font-semibold">
              Add your Categories{" "}
              <span className="text-indigo-500">Stall Marts</span> Application
            </h1>
            <input
              type="text"
              onChange={(e) => setAdd({ ...add, name: e.target.value })}
              required
              autoComplete="off"
              name="name"
              className="border border-gray-300 lg:text-xl text-lg lg:pl-4 pl-2 lg:py-2 py-1 rounded-md outline-gray-400 outline-1 text-black"
            />
            <button
              type="submit"
              className="lg:text-xl lg:px-4 lg:py-2 py-2 lg:self-start bg-indigo-500 text-lg text-white rounded-md hover:bg-indigo-400 transition"
            >
              Add Category
            </button>
          </form>
              <div className="flex flex-wrap lg:gap-4 gap-2 items-center justify-start mt-10 lg:px-3 px-2">
                {Allcat?.length === 0 ? (
                  <>
                    <h1 className="lg:text-2xl text-lg w-full text-gray-500 capitalize text-center font-semibold">
                      There is no category in the list
                    </h1>
                  </>
                ) : (
                  Allcat?.map((data, id) => {
                    return (
                      <>
                        <div className="flex items-center gap-2 justify-between border border-gray-300 rounded-md px-2 py-1 lg:text-xl text-md">
                          <h1
                            key={id}
                            // className="lg:text-xl text-md"
                          >
                            {data?.name}
                          </h1>
                          <IoIosCloseCircleOutline
                            onClick={() => handleIndex(data._id)}
                            className="text-red-500 cursor-pointer"
                          />
                        </div>
                      </>
                    );
                  })
                )}
              </div>
        </section>
      </main>
    </>
  );
};

export default page;
