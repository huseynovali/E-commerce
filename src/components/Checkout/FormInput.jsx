import React from "react";
import { useFormContext, Controller } from "react-hook-form";

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    // <Controller
    // //   name={name}
    // //   control={control}
    // //
    // //   required={required}
    // //   error={isError}
    // />
    <>
      <input required={required} name={name} label={label} placeholder={name} className="border-b py-3 px-2"/>
    </>
  );
}

export default FormInput;
