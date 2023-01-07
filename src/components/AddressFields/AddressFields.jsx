import { useForm, FormProvider, useWatch } from "react-hook-form";

import "./Address.css";
import SelectComponent from "./SelectComponent";
import jsonData from "./../../assets/fakeData.json";
import { useEffect, useState } from "react";

const AddressFields = ({ billState }) => {
  const [division, setDivision] = useState(null);
  const [district, setDistrict] = useState(null);
  const [city, setCity] = useState(null);
  const [union, setUnion] = useState(null);
  const [zip, setZip] = useState(null);
  const [village, setVillage] = useState(null);

  const methods = useForm();
  const {
    register,
    formState: { errors },
    reset,
    watch,
    resetField,
    control,
  } = methods;

  const formData = watch();

  useEffect(() => {
    if (formData.country) {
      setDivision(
        jsonData?.filter((e) => e.name === formData.country)[0]?.state
      );
    }
    if (division) {
      setDistrict(
        division?.filter((e) => e.name === formData.state)[0]?.district
      );
    }
    if (district) {
      setCity(district?.filter((e) => e.name === formData.district)[0]?.city);
    }
    if (city) {
      setUnion(city?.filter((e) => e.name === formData.city)[0]?.union);
    }
    if (union) {
      setZip(union?.filter((e) => e.name === formData.union)[0]?.zipcode);
    }
    if (zip) {
      setVillage(zip?.filter((e) => e.name === formData.zip)[0]?.villages);
    }
  }, [formData]);

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
        <SelectComponent
          control={control}
          name={"country"}
          options={jsonData}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">Division/State</label>
        <SelectComponent control={control} name={"state"} options={division} />
      </div>
      <div className="form-item">
        <label htmlFor="country">District</label>
        <SelectComponent
          control={control}
          name={"district"}
          options={district}
        />
      </div>
      <div className="form-item">
        <label htmlFor="country">City/Sub District/Thana</label>
        <SelectComponent control={control} name={"city"} options={city} />
      </div>
      <div className="form-item">
        <label htmlFor="country">Union/Area/Town</label>
        <SelectComponent control={control} name={"union"} options={union} />
      </div>
      <div className="form-item">
        <label htmlFor="country">Zip Code</label>
        <SelectComponent control={control} name={"zip"} options={zip} />
      </div>
      <div className="form-item">
        <label htmlFor="country">Village</label>
        <SelectComponent control={control} name={"village"} options={village} />
      </div>
    </form>
  );
};

export default AddressFields;
