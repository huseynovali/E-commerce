import React from "react";
import { FaStore } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
const Navbar = ({totalProduct}) => {
  const location =useLocation()
  return (
    <div className="border-b border-l-indigo-200 shadow-md pl-2 pr-3 sticky top-0 bg-white z-10">
      <div className="into max-w-[1400px] m-auto  py-4 flex items-center justify-between">
        <Link to="/" className="nav__logo flex items-center">
          <FaStore className="m-1 text-2xl text-purple-500" />
          <h1 className="text-2xl">E-Commerce</h1>
        </Link>
  {
    location.pathname == "/" ?
      <Link to="/cart">
          <div className="cart__content p-3 bg-slate-200  rounded-3xl relative hover:bg-slate-500 hover:text-white ">
            <AiOutlineShoppingCart className="text-xl" />
            <div className="badge px-2 py-1 bg-red-500 rounded-full text-white text-xs inline absolute -top-1 -right-2">
              <span>{totalProduct}</span>
            </div>
          </div>
        </Link>:null
  }
      
      </div>
    </div>
  );
};

export default Navbar;
