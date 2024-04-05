"use client";
import { signOut } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [fav, setFav] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setisAdmin] = useState("");
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setisAdmin(localStorage.getItem("role") || "false");
  }, []);

  const storeInLC = (role) => {
    setisAdmin(role);
    return localStorage.setItem("role", role);
  };

  const removeinLC = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
    setisAdmin("false");
    localStorage.setItem("role", "false");
  };

  const hanldeaddfav = (product) => {
    toast("Added to Wishlist");
    let favItems = [...fav];
    const indexOfProduct = favItems.findIndex(
      (item) => item._id === product._id
    );
    if (indexOfProduct === -1) {
      favItems.push(product);
    }
    setFav(favItems);
    localStorage.setItem("Fav", JSON.stringify(favItems));
  };

  const handleremoveheart = (product) => {
    toast("Removed from Wishlist");
    let favItems = [...fav];
    favItems = favItems.filter((item) => item._id !== product._id);
    setFav(favItems);
    localStorage.setItem("Fav", JSON.stringify(favItems));
  };

  const handleAddToCart = (product, quantity) => {
    toast("Added to Cart");
    let cartitems = [...cart];
    const itemExists = cartitems?.findIndex((item) => item.product === product);
    if (itemExists === -1) {
      cartitems.push({ product, quantity });
    }
    setCart(cartitems);
    localStorage.setItem("cart", JSON.stringify(cartitems));
  };

  const handleremovecart = (product) => {
    toast("Removed from Cart");
    let cartitems = [...cart];
    cartitems = cartitems.filter((item) => item.product !== product);
    setCart(cartitems);
    localStorage.setItem("cart", JSON.stringify(cartitems));
  };

  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem("Fav")) || []);
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/product", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handlesearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    if (value) {
      let filtered = products.filter((currElem) => {
        return currElem.title.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        fav,
        hanldeaddfav,
        handleremoveheart,
        storeInLC,
        removeinLC,
        handleAddToCart,
        cart,
        handleremovecart,
        handlesearch,
        getAllProducts,
        products,
        searchValue,
        filteredProducts,
        setCart,
        success,
        setSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
