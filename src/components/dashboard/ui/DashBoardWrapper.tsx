import React from "react";
import BackNavBtn from "./BackNavBtn";

interface DashBoardWrapperProps {
  children: React.ReactNode;
  href?: string;
  label: string;
  linkAvailable?: boolean;
}

const DashBoardWrapper = ({ children,linkAvailable, href, label }: DashBoardWrapperProps) => {
  return (
    <div className="w-full flex items-start flex-col gap-5">
      <BackNavBtn href={href || "#"} label={label} linkAvailable={linkAvailable} />
      <div className="w-full max-w-7xl bg-white rounded-md mb-5 p-5  overflow-hidden ">
        {children}
      </div>
    </div>
  );
};

export default DashBoardWrapper;
