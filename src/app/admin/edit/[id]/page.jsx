"use client";
import { useState } from "react";
import AdminNav from "../../components/AdminNav";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/ContextApi";
import { toast } from "react-toastify";

const page = ({ params }) => {
  const router = useRouter();
  const [update, setUpdate] = useState({
    isAdmin: "false",
  });
  const { storeInLC } = useAuth();

  const handleclick = (e) => {
    setUpdate({ isAdmin: e.target.value });
  };

  const handlesubmit = async () => {
    try {
      const res = await fetch(`/api/users?id=${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });
      if (res.ok) {
        const data = await res.json();
        storeInLC(data.response.isAdmin);
        router.push("/admin/users");
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
        <section className="flex items-start mt-7 px-1 justify-center w-full bg-slate-50">
          <div className="flex flex-col lg:gap-10 gap-3">
            <h1 className="lg:text-3xl md:text-xl text-sm font-semibold">
              Change user Role in{" "}
              <span className="text-indigo-500">Aexpop</span> Application
            </h1>
            <select
              onClick={handleclick}
              className="lg:p-4 lg:text-xl p-2 text-md rounded-lg border border-gray-300"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
            <button
              onClick={handlesubmit}
              className="lg:text-xl lg:px-4 lg:py-2 bg-indigo-500 text-lg text-white rounded-md px-3 py-1 hover:bg-indigo-400 transition"
            >
              Save
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
