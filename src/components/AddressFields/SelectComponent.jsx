import { useEffect, useRef, useState } from "react";
import { GlobalStates } from "../../context";

const SelectComponent = ({ options, name, defVal, billState }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const selectRef = useRef(null);
  const selectInputRef = useRef(null);

  const {
    showDefaultVal,
    setShowDefaultVal,
    setFormState,
    formState,
    formState: { billing },
  } = GlobalStates();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (selectRef && !selectRef?.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    });
  }, [selectRef]);

  useEffect(() => {
    if (!billState) {
      setSelectedOption(formState.shipping[name]);
    }
  }, [formState]);

  useEffect(() => {
    setSelectedOption("");
    const formVal = { ...formState };
    if (billState) {
      formVal.billing[name] = "";
    } else {
      if (!showDefaultVal) {
        formVal.shipping[name] = "";
      }
    }
    setFormState(formVal);
  }, [options]);

  useEffect(() => {
    if (options) {
      setData(
        options?.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, options]);

  useEffect(() => {
    if (options) {
      setData(
        options?.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, options]);

  return (
    <div className="select-wrapper" ref={selectRef}>
      <div
        className={`select-input ${showDropdown && "select-open"} ${
          options && "select-arrow"
        } `}
      >
        <input
          onClick={() => {
            setShowDropdown(!showDropdown);
            if (!billState) {
              setShowDefaultVal(false);
            }
          }}
          ref={selectInputRef}
          defaultValue={selectedOption}
          placeholder="Please Search"
          readOnly
          disabled={!options}
          className={`default-input ${showDropdown && "active-border"}`}
        />
      </div>

      {showDropdown && (
        <div className={`select-dropdown`} ref={dropdownRef}>
          <input
            onChange={(e) => setQuery(e.target.value)}
            className="default-input"
            type="search"
            name=""
            id=""
          />
          <ul>
            <li className="readOnly-option">Search for select</li>
            {data?.map((item, i) => (
              <li
                className={`${selectedOption === item.name && "disable-list"}`}
                key={i}
                value={item.name}
                onClick={(e) => {
                  setSelectedOption(e.target.getAttribute("value"));
                  setShowDropdown(false);

                  if (billState) {
                    const formVal = { ...formState.billing };
                    formVal[name] = e.target.getAttribute("value");
                    const formOption = { ...formState.billingOptions };
                    formOption[name] = options.filter(
                      (each) => each.name === e.target.getAttribute("value")
                    )[0];

                    setFormState({
                      ...formState,
                      billing: formVal,
                      billingOptions: formOption,
                    });
                  } else {
                    const formVal = { ...formState.shipping };
                    formVal[name] = e.target.getAttribute("value");
                    const formOption = { ...formState.shippingOptions };
                    formOption[name] = options.filter(
                      (each) => each.name === e.target.getAttribute("value")
                    )[0];

                    setFormState({
                      ...formState,
                      shipping: formVal,
                      shippingOptions: formOption,
                    });
                  }
                  setData(options);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
