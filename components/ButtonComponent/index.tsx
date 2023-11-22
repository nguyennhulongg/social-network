import React from "react";

interface IButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: string | any;
  icon?: any;
  secondary?: boolean;
}

const ButtonCommon: React.FC<IButtonProps> = ({
  label,
  onClick,
  disabled,
  type,
  className,
  icon,
  secondary = true,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} bg-[#18c4af] text-[#EEEEEE] transition hover:bg-[#078a91] cursor-pointer font-bold text-center py-2 rounded-3xl`}
      style={{
        backgroundColor: secondary ? "#18c4af" : "transparent",
        border: secondary ? "none" : "1px solid #ffffff",
      }}
    >
      <p>{icon}</p>
      {label}
    </button>
  );
};

export default ButtonCommon;
