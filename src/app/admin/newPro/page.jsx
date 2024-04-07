"use client";
import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/components/ContextApi";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [Image, setImage] = useState([]);
  const { isAdmin } = useAuth();
  const pathname = usePathname();
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

  useEffect(() => {
    console.log(isAdmin);
    if (isAdmin === "false" && pathname === "/admin/newPro") {
      window.location.href = "/";
    }
  }, [isAdmin]);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "mobiles",
    stock: "",
    oldPrice: "0",
    newPrice: "",
    featured: "false",
    images: [],
  });

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const imageUpload = (file) => {
    try {
      setImage([
        ...Image,
        {
          public_id: file.info.public_id,
          url: file.info.url,
        },
      ]);
      const imageData = {
        public_id: file.info.public_id,
        url: file.info.secure_url,
      };
      setProduct({ ...product, images: [...product.images, imageData] });
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        const data = await res.json();
        router.push("/admin/products");
        toast(data.message);
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
          className="flex justify-start flex-col w-full bg-slate-50"
          style={{ height: "100vh", overflow: "scroll" }}
        >
          <form
            onSubmit={handlesubmit}
            className="w-full flex flex-col gap-3 mt-5 bg-white p-4 rounded-lg"
          >
            <CldUploadButton
              uploadPreset="t6sswtif"
              onUpload={(file) => imageUpload(file)}
              className="bg-indigo-500 text-white px-3 py-2 rounded-md my-2 self-center hover:bg-indigo-400 transition"
            >
              Upload Image
            </CldUploadButton>
            {Image?.map((data) => {
              return (
                <div className="flex gap-2">
                  <CldImage
                    width="160"
                    height="50"
                    src={data.public_id}
                    sizes="100vw"
                    alt="Description of my image"
                  />
                </div>
              );
            })}
            <label htmlFor="tite" className="text-xl">
              Title
            </label>
            <input
              type="text"
              name="title"
              autoComplete="off"
              onChange={handlechange}
              required
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
              className="w-full h-32 bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-1 text-md px-2 transition-colors duration-200 ease-in-out"
            />
            <label htmlFor="category" className="text-xl">
              Category
            </label>
            <select
              name="category"
              onChange={handlechange}
              required
              className="py-2 rounded-md px-1 border-2 border-gray-200 focus:border-gray-300 outline-none"
            >
              {Allcat?.map((data, id) => {
                return (
                  <>
                    <option key={id} value={data.name}>{data.name}</option>
                  </>
                );
              })}
            </select>
            <label htmlFor="oldPrice" className="text-xl">
              Old Price
            </label>
            <input
              type="text"
              name="oldPrice"
              autoComplete="off"
              onChange={handlechange}
              value={product.oldPrice}
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
              className="w-full bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-1 text-md px-2 transition-colors duration-200 ease-in-out"
            />
            <label htmlFor="featured" className="text-xl">
              Featured
            </label>
            <select
              name="featured"
              className="w-full bg-white rounded border-2 border-gray-200 focus:border-gray-300 outline-none text-gray-700 py-2 text-md px-2 transition-colors duration-200 ease-in-out"
              onChange={handlechange}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
            <button
              type="submit"
              className="w-24 self-end bg-indigo-500 py-2 text-white rounded-md mt-4 hover:bg-indigo-400 transition"
            >
              Add
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default page;
