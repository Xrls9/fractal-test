import React from "react";

interface BadgeProps {
  className?: string;
  label: string;
  onClick?: VoidFunction;
  color?: "blue" | "green" | "red" | "yellow" | "gray";
}

const colorMap = {
  blue: "bg-blue-500 text-gray-100 ",
  green: "bg-green-500 text-gray-100",
  red: "bg-red-500 text-gray-100",
  yellow: "bg-yellow-500 text-black bold",
  gray: "bg-gray-500 text-gray-100",
};

const Badge: React.FC<BadgeProps> = ({ label, onClick, color = "blue" }) => {
  return (
    <span
      className={`px-2 py-1 text-sm rounded-full cursor-pointer font-bold ${colorMap[color]}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Badge;
