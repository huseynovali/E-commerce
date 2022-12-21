import React from "react";
import { FaTrashAlt } from "react-icons/fa";
const CartItem = ({ item, onUpdateCartQty ,handleRemoveToCart}) => {
  return (
    <div className=" shadow-lg bg-slate-300 my-3  px-2 py-3 rounded-md  ">
      <div className="cart__products flex justify-between">
      <div className="cart__product__info flex">
        <div className="cart__img">
          <img src={item.image.url} className="h-[50px] w-14 mr-3" />
        </div>
        <h3>{item.name}</h3>
      </div>
      <div className="flex items-center">
        <div className="inc__dec__btn flex bg-slate-100 h-[50px] rounded-md">
          <button
            className=" bg-slate-200 rounded-tl-md rounded-bl-md px-4  hover:bg-slate-500 hover:text-white"
            onClick={() => {
              onUpdateCartQty(item.id, item.quantity - 1);
            }}
          >
            -
          </button>
          <span className="p-3">{item.quantity}</span>

          <button
            className=" bg-slate-200  rounded-tr-md rounded-br-md px-4 ml-1 hover:bg-slate-500 hover:text-white"
            onClick={() => {
              onUpdateCartQty(item.id, item.quantity + 1);
            }}
          >
            +
          </button>
        </div>
        <p className="ml-5 text-sm w-[100px] text-center">
          {item.line_total.formatted_with_code}
        </p>
        <FaTrashAlt className="mx-3 text-slate-100 hover:text-slate-400" onClick={()=>{handleRemoveToCart(item.id)}}/>
      </div>
      </div>
    </div>
  );
};

export default CartItem;
