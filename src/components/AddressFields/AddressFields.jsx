import { useForm, FormProvider, useWatch } from "react-hook-form";

import "./Address.css";
import SelectComponent from "./SelectComponent";
import jsonData from "./../../assets/fakeData.json";
import { useEffect } from "react";

const AddressFields = ({ billState }) => {
  const methods = useForm();
  const {
    register,
    formState: { errors },
    getValues,watch,control
  } = methods;


  const data = watch();
  console.log(data);

  return (
      <form className="address">
        <h2 className="address__title">
          {billState ? (
            "billing Address"
          ) : (
            <>
              Shipping Address <button>Copy Billing Address</button>
            </>
          )}
        </h2>
        <div className="form-item">
          <label htmlFor="attention">Attention</label>
          <input
            type="text"
            id="attention"
            className="default-input"
            placeholder="Enter Persons name"
            {...register("attention")}
          />
        </div>
        <div className="form-item">
          <label htmlFor="country">Country</label>
          <SelectComponent control={control} name={"country"} options={jsonData} />
        </div>
        {/* <div className="form-item">
          <label htmlFor="country">Division/State</label>
          <SelectComponent itemName={"state"} />
        </div>
        <div className="form-item">
          <label htmlFor="country">District</label>
          <SelectComponent itemName={"district"} />
        </div>
        <div className="form-item">
          <label htmlFor="country">City/Sub District/Thana</label>
          <SelectComponent itemName={"thana"} />
        </div>
        <div className="form-item">
          <label htmlFor="country">Union/Area/Town</label>
          <SelectComponent itemName={"union"} />
        </div>
        <div className="form-item">
          <label htmlFor="country">Zip Code</label>
          <SelectComponent itemName={"zip"} />
        </div>
        <div className="form-item">
          <label htmlFor="country">Street Address/Village</label>
          <SelectComponent itemName={"village"} />
        </div> */}
      </form>
  );
};

export default AddressFields;
