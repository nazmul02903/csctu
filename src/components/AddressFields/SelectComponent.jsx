import { useEffect, useRef, useState } from "react";

import { useFormContext } from "react-hook-form";

const SelectComponent = ({ options,itemName }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);
  const selectRef = useRef(null);
  const {register} = useFormContext();
  console.log(itemName);


  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (selectRef && !selectRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    });
  }, [selectRef]);

  return (
    <div className="select-wrapper" ref={selectRef}>
      <div className={`select-input ${showDropdown && "select-open"}`}>
        <input
          onClick={() => setShowDropdown(!showDropdown)}
          placeholder="Please Search"
          type="text"
          value={selectedOption && selectedOption}
          className={`default-input ${showDropdown && "active-border"}`}
          readOnly
          {...register(itemName)} 
        />
      </div>

      {showDropdown && (
        <div className={`select-dropdown`} ref={dropdownRef}>
          <input className="default-input" type="search" name="" id="" />
          <ul>
            <li className="readOnly-option">Search for select</li>
            {options.map((each, i) => (
              <li
                key={i}
                value={each.country}
                onClick={(e) => {
                  setSelectedOption(e.target.getAttribute("value"));
                  setShowDropdown(false);
                }}
              >
                {each.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
