import { useForm } from "react-hook-form";
import "./Address.css";
import SelectComponent from "./SelectComponent";
import jsonData from "./../../assets/fakeData.json";
import { useEffect, useState } from "react";
import downLoadIcon from "../../assets/icon/downloadIcon.svg";
import { GlobalStates } from "../../context";

const AddressFields = ({ billState }) => {
  const { formState, setFormState, setShowDefaultVal, showDefaultVal } =
    GlobalStates();
  const { register, watch } = useForm();

  const bill_or_ship = billState ? "billing" : "shipping";
  const formData = watch();

  // useEffect(() => {
  //   const formVal = { ...formState };
  //   formVal[bill_or_ship] = { ...formVal[bill_or_ship], ...formData };
  // }, [formData]);
  return (
    <form
      onBlur={() => {
        if (billState) {
          const formVal = { ...formState };
          formVal[bill_or_ship] = { ...formVal[bill_or_ship], ...formData };
          console.log(formVal);
          setFormState(formVal);
        }
      }}
      className="address"
    >
      <div className="address__title">
        {billState ? (
          <h3>billing Address</h3>
        ) : (
          <div className="shipping-title">
            <h3> Shipping Address</h3>{" "}
            <div
              className="copy-btn"
              onClick={() => {
                const billingVal = { ...formState.billing };
                const billingOpt = { ...formState.billingOptions };
                setFormState({
                  ...formState,
                  shipping: billingVal,
                  shippingOptions: billingOpt,
                });

                setShowDefaultVal(true);
              }}
            >
              {" "}
              <img src={downLoadIcon} alt="" width={22} height={22} /> Copy
              Billing Address
            </div>
          </div>
        )}
      </div>
      <div className="form-item">
        <label htmlFor="attention">Attention</label>
        <input
          type="text"
          id="attention"
          className="default-input"
          placeholder="Enter Persons name"
          defaultValue={showDefaultVal ? formState[bill_or_ship].attention : ""}
          {...register("attention")}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Country</label>
        <SelectComponent
          name={"country"}
          billState={billState}
          options={jsonData}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Division/State</label>
        <SelectComponent
          billState={billState}
          name={"state"}
          options={
            billState
              ? formState.billingOptions?.country?.state
              : formState.shippingOptions?.country?.state
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">District</label>
        <SelectComponent
          billState={billState}
          name={"district"}
          options={
            billState
              ? formState.billingOptions?.state?.district
              : formState.shippingOptions?.state?.district
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">City/Sub District/Thana</label>
        <SelectComponent
          billState={billState}
          name={"city"}
          options={
            billState
              ? formState.billingOptions?.district?.city
              : formState.shippingOptions?.district?.city
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Union/Area/Town</label>
        <SelectComponent
          billState={billState}
          name={"union"}
          options={
            billState
              ? formState.billingOptions?.city?.union
              : formState.shippingOptions?.city?.union
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Zip Code</label>
        <SelectComponent
          billState={billState}
          name={"zipcode"}
          options={
            billState
              ? formState.billingOptions?.union?.zipcode
              : formState.shippingOptions?.union?.zipcode
          }
        />
      </div>

      <div className="form-item">
        <label htmlFor="country">Street Address/Village</label>
        <SelectComponent
          billState={billState}
          name={"village"}
          options={
            billState
              ? formState.billingOptions?.zipcode?.villages
              : formState.shippingOptions?.zipcode?.villages
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="house">House</label>
        <input
          type="text"
          id="house"
          className="default-input"
          defaultValue={showDefaultVal ? formState[bill_or_ship].house : ""}
          {...register("house")}
        />
      </div>
      <div className="form-item">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          className="default-input"
          defaultValue={showDefaultVal ? formState[bill_or_ship].phone : ""}
          {...register("phone")}
        />
      </div>
      <div className="form-item">
        <label htmlFor="phone">Fax</label>
        <input
          type="tel"
          id="fax"
          defaultValue={showDefaultVal ? formState[bill_or_ship].fax : ""}
          className="default-input"
          {...register("fax")}
        />
      </div>
    </form>
  );
};

export default AddressFields;
