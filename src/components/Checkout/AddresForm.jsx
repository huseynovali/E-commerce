import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import FormInput from "./FormInput";
const AddressForm = ({ checkoutToken ,test}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
    console.log(shippingCountry);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
        <div className="grid grid-cols-2 gap-7">
          <FormInput required name="firstName" label="First name" />
          <FormInput required name="lastName" label="Last name" />
          <FormInput required name="address1" label="Address line 1" />
          <FormInput required name="email" label="Email" />
          <FormInput required name="city" label="City" />
          <FormInput required name="zip" label="Zip / Postal code" />
          <div className="Shipping__Country flex flex-col">
            <label className="text-sm mb-2">Shipping Country</label>
            <select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              className="p-2 "
            >
              {Object.entries(shippingCountries)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="Shipping__Subdivision flex flex-col">
            <label className="text-sm mb-2">Shipping Subdivision</label>
            <select
              value={shippingSubdivision}
              onChange={(e) => setShippingSubdivision(e.target.value)}
              className="p-2 "
            >
              {Object.entries(shippingSubdivisions)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="Shipping_Options flex flex-col">
            <label className="text-sm mb-2">Shipping Options</label>
            <select
              value={shippingOption}
              fullWidth
              onChange={(e) => setShippingOption(e.target.value)}
              className="p-2 "
            >
              {shippingOptions
                .map((sO) => ({
                  id: sO.id,
                  label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:"30px" }}>
           <Link to="/cart"><button className="p-2 bg-slate-300 rounded-md">Back to Cart</button></Link> 
            <button type="submit" className="p-2 bg-blue-500 rounded-md text-white" >Next</button>
          </div>
      </form>
    </FormProvider>
  );
};

export default AddressForm;
