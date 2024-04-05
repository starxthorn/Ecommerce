"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

const page = ({ params }) => {
  const [productdetails, setProductdetails] = useState({
    title: "",
    description: "",
    category: "",
    stock: "",
    oldPrice: "",
    newPrice: "",
    featured: "",
  });
  const router = useRouter();

  const getclickedData = async () => {
    try {
      const res = await fetch(`/api/productdetails?id=${params.id}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setProductdetails({
          title: data.response.title,
          description: data.response.description,
          category: data.response.category,
          stock: data.response.stock,
          oldPrice: data.response.oldPrice,
          newPrice: data.response.newPrice,
          featured: data.response.featured,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getclickedData();
  }, []);

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductdetails({
      ...productdetails,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/product?id=${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productdetails),
      });
      if (res.ok) {
        const data = await res.json();
        setProductdetails({
          title: data.response.title,
          description: data.response.description,
          category: data.response.category,
          stock: data.response.stock,
          oldPrice: data.response.oldPrice,
          newPrice: data.response.newPrice,
          featured: data.response.featured,
        });
        router.push("/admin/products");
        toast(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handledelete = async () => {
    try {
      const res = await fetch(`/api/product?id=${params.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/products");
        toast("Product Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex">
        <AdminNav />
        <section
          className="flex justify-center items-start w-full bg-slate-50"
          style={{ height: "100vh", overflow: "scroll" }}
        >
          <form
            onSubmit={handlesubmit}
            className="w-full flex flex-col gap-3 mt-5 bg-white p-4 rounded-lg"
          >
            <label htmlFor="tite" className="text-xl">
              Title
            </label>
            <input
              type="text"
              name="title"
              autoComplete="off"
              onChange={handlechange}
              required
              value={productdetails.title}
              className="w-full bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-1 text-xl px-2 transition-colors duration-200 ease-in-out"
            />
            <label htmlFor="description" className="text-xl">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              autoComplete="off"
              onChange={handlechange}
              required
              value={productdetails.description}
              className="w-full h-32 bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-1 text-md px-2 transition-colors duration-200 ease-in-out"
            />
            <label htmlFor="category" className="text-xl">
              Category
            </label>
            <select
              name="category"
              onChange={handlechange}
              required
              value={productdetails.category}
              className="py-2 rounded-md px-1 border-2 border-gray-200 focus:border-gray-300 outline-none"
            >
              <option value="mobiles">Mobiles</option>
              <option value="cables">Cables</option>
              <option value="laptops">Laptops</option>
              <option value="processors">Processors</option>
              <option value="motherboards">Motherboards</option>
              <option value="graphic cards">Graphic Cards</option>
            </select>
            <label htmlFor="oldPrice" className="text-xl">
              Old Price
            </label>
            <input
              type="text"
              name="oldPrice"
              autoComplete="off"
              onChange={handlechange}
              required
              value={productdetails.oldPrice}
              className="w-full bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-1 text-md px-2 transition-colors duration-200 ease-in-out"
            />
            <label htmlFor="newPrice" className="text-xl">
              New Price
            </label>
            <input
              type="text"
              name="newPrice"
              autoComplete="off"
              onChange={handlechange}
              required
              value={productdetails.newPrice}
              className="w-full bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-1 text-md px-2 transition-colors duration-200 ease-in-out"
            />
            <label htmlFor="stock" className="text-xl">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              autoComplete="off"
              onChange={handlechange}
              required
              value={productdetails.stock}
              className="w-full bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-1 text-md px-2 transition-colors duration-200 ease-in-out"
            />
            <label htmlFor="featured" className="text-xl">
              Featured
            </label>
            <select
              name="featured"
              className="w-full bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-2 text-md px-2 transition-colors duration-200 ease-in-out"
              value={productdetails.featured}
              onChange={handlechange}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                className="w-24 self-end bg-indigo-500 py-2 text-white rounded-md mt-4 hover:bg-indigo-400 transition"
              >
                Save
              </button>
              <FaRegTrashCan
                onClick={handledelete}
                className="lg:text-4xl text-gray-500 hover:text-black transition text-2xl cursor-pointer mt-3"
              />
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default page;
