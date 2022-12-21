import React from "react";

const Review = ({ checkoutToken }) => (
  <>
    <p className="text-3xl">Order summary</p>
    <ul>
      {checkoutToken.line_items.map((product) => (
        <li
          style={{
            padding: "10px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
          key={product.name}
        >
          <p className="w-[150px]">{product.name}</p>
          <p className="px-3 w-[150px]">Quantity:{product.quantity}</p>
          <p className="px-5 w-[150px] text-right">{product.line_total.formatted_with_symbol}</p>
        </li>
      ))}
      <li style={{ padding: "10px 0",marginTop:"20px" }}>
        <p>Total</p>
        <p style={{ fontWeight: 700 }}>
          {checkoutToken.subtotal.formatted_with_symbol}
        </p>
      </li>
    </ul>
  </>
);

export default Review;
