"use client";
import AdminNav from "../components/AdminNav";
import { useState, useEffect } from "react";
import Trans from "../components/Trans";
import Loader from "@/app/components/Loader";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleClick = () => {
    setisLoading(true);
  };

  const getAllSales = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <>
      <main className="flex">
        <AdminNav />
        <section className="w-full overflow-scroll h-[100vh]">
          {orders?.length === 0 || isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="lg:m-7 m-4 bg-white rounded-lg">
                {orders
                  ?.map((data, id) => {
                    return (
                      <Trans
                        clickOnImg={handleClick}
                        id={id}
                        tid={data._id}
                        name={data.user?.name}
                        location={data.user?.location}
                        phone={data.user?.phone}
                      />
                    );
                  })
                  .reverse()}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default page;
