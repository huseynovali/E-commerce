import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import AddressForm from "./AddresForm";
import PaymentForm from "./Paymentorm";
import ReactLoading from "react-loading";
const steps = ["Shipping address", "Payment details"];

function Checkout({ cart, onCaptureCheckout, order, error }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch {}
    };
    generateToken();
  }, [cart]);

  const test = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () => {
    return (
      <>
        <div>
          <h5 className="p-2 bg-blue-500">Thank you for Shiping !</h5>
        </div>
        <br />
        <Link to="/">
          <button variant="outlined" type="button">
            Back to home
          </button>
        </Link>
      </>
    );
  };
  if (error) {
    Confirmation = () => (
      <>
        <p variant="h5">Error: {error}</p>
        <br />
        <Link to="/">
          <button className="text-lg" type="button">
            Back to home
          </button>
        </Link>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} test={test} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <div className="flex items-center ">
      <div className="paper lg:w-[1000px] shadow-md m-auto mt-8 border p-2 ">
        <h1 className="text-3xl text-center">Checkout</h1>

        <div className="stepper flex w-full justify-between px-5 my-5 items-center">
          <div className="step__one flex items-center">
            <span
              className="w-[35px] h-[35px] block text-center py-1 bg-slate-400  text-white rounded-full "
              style={
                activeStep == 0
                  ? { background: "blue" }
                  : { background: "green" }
              }
            >
              1
            </span>
            <span className="ml-2">Shipping Address</span>
          </div>

          <div className="line h-[2px] w-[60%] m-auto bg-slate-300"></div>

          <div className="step__Two flex items-center ">
            <span
              className="w-[35px] h-[35px] block text-center bg-slate-400 py-1 text-white rounded-full "
              style={
                activeStep == 1
                  ? { background: "blue" }
                  : activeStep == 2
                  ? { background: "green" }
                  : null
              }
            >
              2
            </span>
            <span className="ml-2">Payment Details</span>
          </div>
        </div>
        <div className="px-5 mt-[50px]">
          {activeStep === steps.length ? (
            <Confirmation />
          ) : checkoutToken ? (
            <Form />
          ) : (
            <div className="h-[90vh] w-full flex justify-center items-center">
              <ReactLoading
                type="bubbles"
                color="#0000FF"
                height={200}
                width={100}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
