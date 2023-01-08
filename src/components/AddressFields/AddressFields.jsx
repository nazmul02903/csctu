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
  const [zip, setZip] = useState(null);
  const [village, setVillage] = useState(null);

  const { formState, setFormState, setShowDefaultVal, showDefaultVal } =
    GlobalStates();
  const methods = useForm();
  const { register, watch, control } = methods;
  const formData = watch();
  
  
  useEffect(() => {
    if (formData.country) {
      setDivision(
        jsonData?.filter((e) => e.name === formData.country)[0]?.state
      );
    }
    setDistrict(
      division?.filter((e) => e.name === formData.state)[0]?.district
    );
    setCity(district?.filter((e) => e.name === formData.district)[0]?.city);
    setUnion(city?.filter((e) => e.name === formData.city)[0]?.union);
    setZip(union?.filter((e) => e.name === formData.union)[0]?.zipcode);
    setVillage(zip?.filter((e) => e.name === formData.zip)[0]?.villages)
  }, [formData,city, district,union, zip, village,division]);

  return (
    <form className="address" onBlur={() => {
      setShowDefaultVal(false)
      setFormState(formData)
    }}>
      <div className="address__title">
        {billState ? (
          <h3>billing Address</h3>
        ) : (
          <div className="shipping-title">
            <h3> Shipping Address</h3>{" "}
            <div
              className="copy-btn"
              onClick={() => {
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
          defVal={showDefaultVal ? formState.country : ""}
          control={control}
          name={"country"}
          options={jsonData}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Division/State</label>
        <SelectComponent
          defVal={showDefaultVal ? formState.state : ""}
          control={control}
          name={"state"}
          options={division}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">District</label>
        <SelectComponent
          defVal={showDefaultVal ? formState.district : ""}
          control={control}
          name={"district"}
          options={district}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">City/Sub District/Thana</label>
        <SelectComponent
          defVal={showDefaultVal ? formState.city : ""}
          control={control}
          name={"city"}
          options={city}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Union/Area/Town</label>
        <SelectComponent
          defVal={showDefaultVal ? formState.union : ""}
          control={control}
          name={"union"}
          options={union}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Zip Code</label>
        <SelectComponent
          defVal={showDefaultVal ? formState.zip : ""}
          control={control}
          name={"zip"}
          options={zip}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Street Address/Village</label>
        <SelectComponent
          defVal={showDefaultVal ? formState.village : ""}
          control={control}
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
