"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminItem from "../components/AdminItem";
import { useSession } from "next-auth/react";
import { useAuth } from "@/app/components/ContextApi";
import { usePathname } from "next/navigation";
import Loader from "@/app/components/Loader";

const page = () => {
  const [users, setUsers] = useState([]);
  const session = useSession();
  const { isAdmin } = useAuth();
  const pathname = usePathname();
  const [isLoading, setisLoading] = useState(false);

  const hanldeClick = () => {
    setisLoading(true);
  };

  useEffect(() => {
    console.log(isAdmin);
    if (isAdmin === "false" && pathname === "/admin/users") {
      window.location.href = "/";
    }
  }, [isAdmin]);

  const getAllusers = async () => {
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

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <>
      <main className="flex">
        <AdminNav />
        <section
          className=" w-full bg-slate-50"
          style={{ height: "100vh", overflow: "scroll" }}
        >
          <div className="flex justify-start flex-col lg:px-5 px-1">
            {users?.length === 0 || isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="w-full mt-1 lg:mt-5 bg-white rounded-lg border border-gray-300">
                  {users?.map((data, id) => {
                    return (
                      <AdminItem
                        clickOnImg={hanldeClick}
                        keyid={id}
                        name={data.name}
                        email={data.email}
                        id={data._id}
                        role={data.isAdmin}
                        imageUrl={data.avatar || session.data.user.image}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
