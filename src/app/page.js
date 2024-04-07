"use client";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import Products from "./components/Products";
const Featured = lazy(() => import("./components/Featured"));
const Footer = lazy(() => import("./components/Footer"));
const Hero = lazy(() => import("./components/Hero"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero />
        <Featured />
        <Products/>
        <Footer />
      </Suspense>
    </>
  );
}
