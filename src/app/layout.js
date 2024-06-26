import { Inter } from "next/font/google";
import "./globals.css";
const Navbar = lazy(() => import("./components/Navbar"));
import { AuthContextProvider } from "./components/ContextApi";
import { AuthSessionProvider } from "./components/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aexpop",
  description:
    "The best tech shop in Pakistan having quality products on reasonable prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <AuthContextProvider>
            <Suspense fallback={<Loader />}>
              <Navbar />
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                bodyClassName="toastBody"
              />
            </Suspense>
          </AuthContextProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
