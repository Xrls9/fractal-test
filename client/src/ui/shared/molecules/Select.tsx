import React from "react";

interface SelectOption {
  label: string;
  value: number;
}

interface SelectProps {
  className: string;
  handleSelect: (value: number) => void;
  id: string;
  name: string;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({
  className = "",
  handleSelect,
  id,
  name,
  options,
}) => {
  return (
    <select
      className={className}
      name={name}
      id={id}
      defaultValue=""
      onChange={(e) => handleSelect(parseInt(e.target.value))}
    >
      <option value="" disabled className="bg-black">
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-black">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
