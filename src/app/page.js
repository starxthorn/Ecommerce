"use client";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
const Featured = lazy(() => import("./components/Featured"));
const Footer = lazy(() => import("./components/Footer"));
const Hero = lazy(() => import("./components/Hero"));
const Test = lazy(() => import("./components/Test"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero />
        <Featured />
        <Test />
        <Footer />
      </Suspense>
    </>
  );
}
