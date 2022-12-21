import React from 'react'
import Review from './Reviev'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51MGzbiCN7yIWo89J5khpxGR54clDG4Vq2Xpiz3ub881KH6FGQgmvQND1UpzNXb8tBSP6odT2UMHJqQF1n4idXzCF00WBXWmSnV");

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };
 

  return (
     <>
    <Review checkoutToken={checkoutToken} />

    <p className='text-xl'  style={{ margin: '20px 0' }}>Payment method</p>
    <Elements stripe={stripePromise}>
      <ElementsConsumer>{({ elements, stripe }) => (
        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
           <CardElement />
           <br /> <br />
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button  onClick={backStep} className="py-2 px-3 rounded-md bg-slate-500 text-white">Back</button>
            <button type="submit"  disabled={!stripe}  className="py-2 px-3 rounded-md bg-green-400 text-white">
               Pay {checkoutToken.subtotal.formatted_with_symbol}
            </button>
          </div>
        </form>
      )}
       </ElementsConsumer>
     </Elements>
 </>
   )
}

export default PaymentForm