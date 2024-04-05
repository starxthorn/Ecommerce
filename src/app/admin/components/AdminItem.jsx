"use client";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAuth } from "@/app/components/ContextApi";

const AdminItem = (props) => {
  const { removeinLC } = useAuth();
  const session = useSession();

  const handledelete = async () => {
    try {
      const res = await fetch(`/api/user?id=${props.id}`, {
        method: "DELETE",
      });
      if (session?.data?.user?.email === props.email) {
        removeinLC();
        localStorage.removeItem("role");
      }
      if (res.ok) {
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <>
      <section className="w-full flex items-center justify-between gap-2 lg:py-4 lg:px-4 py-3 px-2 my-2">
        <Link href={`/admin/edit/${props.id}`} onClick={props.clickOnImg}>
          <div className="relative">
            <img
              src={props.imageUrl}
              className="relative lg:h-16 lg:w-16 h-10 w-10 rounded-full"
              alt="image of user"
            />
            {props.role === true ? (
              <>
                <div className="absolute lg:w-8 lg:h-8 w-5 h-5 bg-indigo-500 rounded-full lg:border-4 border-2 border-white -top-2 -right-2"></div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Link>
        <h4 className="text-sm lg:text-xl md:text-lg">{props.email}</h4>
        <MdDeleteOutline
          onClick={handledelete}
          className="md:text-4xl cursor-pointer lg:text-5xl lg:p-2 transition hover:bg-red-400 text-3xl p-1 bg-red-500 text-white rounded-md justify-self-end"
        />
      </section>
    </>
  );
};

export default AdminItem;
