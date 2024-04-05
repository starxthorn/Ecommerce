import React from "react";
import "../globals.css";

const Loader = () => {
  return (
    <>
      <div className="container mx-auto w-full h-[80vh] flex items-center justify-center">
        <div className="loader w-20 h-20 rounded-full"></div>
      </div>
    </>
  );
};

export default Loader;
