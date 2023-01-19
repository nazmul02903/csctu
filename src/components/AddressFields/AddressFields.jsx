import { useForm } from "react-hook-form";
import "./Address.css";
import SelectComponent from "./SelectComponent";
import jsonData from "./../../assets/fakeData.json";
import { useEffect, useState } from "react";
import downLoadIcon from "../../assets/icon/downloadIcon.svg";
import { GlobalStates } from "../../context";

const AddressFields = ({ billState }) => {
  const [division, setDivision] = useState(null);
  const [district, setDistrict] = useState(null);
  const [city, setCity] = useState(null);
  const [union, setUnion] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [village, setVillage] = useState(null);

  const { formState, setFormState, setShowDefaultVal, showDefaultVal } =
    GlobalStates();
  const { register } = useForm();

  const bill_or_ship = billState ? "billing" : "shipping";

  useEffect(() => {
    if (formState[bill_or_ship].country) {
      setDivision(
        jsonData?.filter((e) => e.name === formState[bill_or_ship].country)[0]
          ?.state
      );
    }
    setDistrict(
      division?.filter((e) => e.name === formState[bill_or_ship].state)[0]
        ?.district
    );
    setCity(
      district?.filter((e) => e.name === formState[bill_or_ship].district)[0]
        ?.city
    );
    setUnion(
      city?.filter((e) => e.name === formState[bill_or_ship].city)[0]?.union
    );
    setZipcode(
      union?.filter((e) => e.name === formState[bill_or_ship].union)[0]?.zipcode
    );
    setVillage(
      zipcode?.filter((e) => e.name === formState[bill_or_ship].zipcode)[0]
        ?.villages
    );
  }, [formState, city, district, union, zipcode, village, division]);

  return (
    <form
      className="address"
      onClick={() => {
        if (billState) {
          setShowDefaultVal(false);
        }
      }}
      onBlur={() => {
        // setFormState(formData);
      }}
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
                setFormState({ ...formState, shipping: billingVal });
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
          defaultValue={showDefaultVal ? formState.attention : ""}
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
          options={division}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">District</label>
        <SelectComponent
          billState={billState}
          name={"district"}
          options={district}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">City/Sub District/Thana</label>
        <SelectComponent billState={billState} name={"city"} options={city} />
      </div>
      <div className="form-item">
        <label htmlFor="country">Union/Area/Town</label>
        <SelectComponent billState={billState} name={"union"} options={union} />
      </div>
      <div className="form-item">
        <label htmlFor="country">Zip Code</label>
        <SelectComponent
          billState={billState}
          name={"zipcode"}
          options={zipcode}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Street Address/Village</label>
        <SelectComponent
          billState={billState}
          name={"village"}
          options={village}
        />
      </div>
      <div className="form-item">
        <label htmlFor="house">House</label>
        <input
          type="text"
          id="house"
          defaultValue={showDefaultVal ? formState.house : ""}
          className="default-input"
          {...register("house")}
        />
      </div>
      <div className="form-item">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          className="default-input"
          defaultValue={showDefaultVal ? formState.phone : ""}
          {...register("phone")}
        />
      </div>
      <div className="form-item">
        <label htmlFor="phone">Fax</label>
        <input
          type="tel"
          id="fax"
          defaultValue={showDefaultVal ? formState.fax : ""}
          className="default-input"
          {...register("fax")}
        />
      </div>
    </form>
  );
};

export default AddressFields;
