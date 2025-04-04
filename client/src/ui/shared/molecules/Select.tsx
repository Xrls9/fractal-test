import React from "react";

interface SelectOption {
  label: string;
  value: number;
}

interface SelectProps {
  id: string;
  name: string;
  className: string;
  options: SelectOption[];
  handleSelect: (value: number) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  name,
  id,
  className = "",
  handleSelect,
}) => {
  const Options = () => {
    return options.map((option) => (
      <option key={option.value} value={option.value} className="bg-black">
        {option.label}
      </option>
    ));
  };

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
      {Options()}
    </select>
  );
};

export default Select;
