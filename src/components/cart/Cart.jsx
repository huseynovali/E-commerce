import React from "react";
import CartItem from "./CartItem/CartItem";
import { FcShop } from "react-icons/fc";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
const Cart = ({
  cart,
  onUpdateCartQty,
  handleRemoveToCart,
  handleClearCart,
}) => {
  if (!cart.line_items) {
    return (
      <div className="h-[90vh] w-full flex justify-center items-center">
        <ReactLoading type="bubbles" color="#0000FF" height={200} width={100} />
      </div>
    );
  }

  return (
    <div className="lg:w-[1000px] mx-auto mt-10">
      {cart.line_items.length !== 0 ? (
        <>
          {cart.line_items.map((item) => {
            return (
              <div>
                <CartItem
                  item={item}
                  onUpdateCartQty={onUpdateCartQty}
                  handleRemoveToCart={handleRemoveToCart}
                />
              </div>
            );
          })}
          <div className="w-full flex justify-end mt-10">
            <button
              className="px-3 py-2 text-white bg-red-500 rounded-md"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <Link to="/checkout">
              <button
                type="link"
                className="px-3 py-2 text-white bg-blue-500 rounded-md ml-2"
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <Link
          to="/"
          className="h-[90vh] flex  flex-col items-center justify-center"
        >
          <FcShop className="text-5xl" />
          <p className="text-3xl">Back to Shopping</p>
        </Link>
      )}
    </div>
  );
};

export default Cart;
