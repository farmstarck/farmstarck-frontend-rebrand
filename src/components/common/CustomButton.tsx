"use client";
type Style = {
  white: string;
  green: string;
};

interface CustomButtonProps {
  color: keyof Style; // Restrict color to valid keys of Style
  text: string; // Text to be displayed on the button
  onClick?: () => void;
  // [key: string]: any; // Allow additional props
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  color,
  text,
  ...props
}) => {
  const baseStyle: Style = {
    white: "group bg-white hover:bg-dark-primary",
    green: "group bg-dark-primary hover:bg-white",
  };
  const texStyle: Style = {
    green: "text-white group-hover:text-dark-primary ",
    white: "dark-primary group-hover:text-white",
  };
  const iconStyle: Style = {
    green:
      "bg-white dark-primary group-hover:bg-dark-primary group-hover:text-white",
    white:
      "bg-dark-primary text-white group-hover:dark-primary group-hover:bg-white",
  };
  return (
    <button
      className={`flex items-center justify-between p-2 rounded-full w-full cursor-pointer transition ease-in-out duration-150 ${baseStyle[color]} `}
      {...props}
    >
      <span
        className={`pl-3 text-btn-txt md:text-xs  uppercase ${texStyle[color]}`}
      >
        {text}
      </span>
      <span
        className={`w-6 h-6 rounded-full flex justify-center items-center text-sm ${iconStyle[color]}`}
      >
        &#8594;
      </span>
    </button>
  );
};

export default CustomButton;
