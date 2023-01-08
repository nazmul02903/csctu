import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { GlobalStates } from "../../context";

const SelectComponent = ({ options, name, control, defVal }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const selectRef = useRef(null);
  const selectInputRef = useRef(null);


  const { showDefaultVal } = GlobalStates();
  const { field } = useController({
    control,
    name,
  });


  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (selectRef && !selectRef?.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    });
  }, [selectRef]);

  useEffect(() => {
    setData(
      options?.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, options]);

  useEffect(() => {
    setSelectedOption("");
  }, [options])

  useEffect(() => {
    if (showDefaultVal) {
      setSelectedOption(defVal);
    }
  }, [showDefaultVal,defVal]);

  return (
    <div className="select-wrapper" ref={selectRef}>
      <div
        className={`select-input ${showDropdown && "select-open"} ${
          options && "select-arrow"
        }`}
      >
        <input
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          name={field.name}
          onBlur={field.onBlur}
          onFocus={field.onChange}
          onChange={field.onChange}
          ref={selectInputRef}
          defaultValue={selectedOption}
          placeholder="Please Search"
          readOnly
          disabled={!options && !defVal}
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
                  setTimeout(() => {
                    selectInputRef.current.focus();
                  }, 10);
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
