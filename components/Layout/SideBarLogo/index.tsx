import React from "react";
import { QqOutlined } from "@ant-design/icons";

const SideBarLogo = () => {
  return (
    <div
      className="
        rounded-full 
        h-14
        w-14 
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-spacity-10 
        cursor-pointer 
        transition
        text-[#424242]
        text-4xl
        "
    >
      <QqOutlined />
    </div>
  );
};

export default SideBarLogo;
