import { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Products from "./components/Products/Products";
import Cart from "./components/cart/Cart";
import { commerce } from "./lib/commerce";
import { Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout/checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response);
  };
  const handleRemoveToCart = async (productId) => {
    const item = await commerce.cart.remove(productId);
    setCart(item);
  };

  const handleClearCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response);
    console.log("salam");
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <>
      <Navbar totalProduct={cart.total_unique_items} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Products
              AllProducts={products}
              AddProductToCart={handleAddToCart}
            />
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              handleRemoveToCart={handleRemoveToCart}
              handleClearCart={handleClearCart}
            />
          }
        />
        <Route
          exact
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
