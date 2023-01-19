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

  const { showDefaultVal, setFormState, formState } =
    GlobalStates();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (selectRef && !selectRef?.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    });
  }, [selectRef]);

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
    const bill_or_ship = billState ? "billing" : "shipping";
    setSelectedOption("");
    const formVal = { ...formState };
    formVal[bill_or_ship][name] = "";
    setFormState(formVal);
  }, [options]);

  useEffect(() => {
    if (!billState) {
      setSelectedOption(formState.shipping[name]);
    }
  }, [showDefaultVal]);

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
                  const formVal = { ...formState };
                  if (billState) {
                    formVal.billing[name] = e.target.getAttribute("value");
                  } else {
                    formVal.shipping[name] = e.target.getAttribute("value");
                  }
                  setFormState(formVal);
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
