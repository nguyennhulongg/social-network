import React from "react";
import SideBar from "./SideBar";
import FollowBar from "./FollowBar";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className=" bg-[#ebebeb] p-2 h-full">
      <div className="h-full xl:px-30">
        <div className="grid grid-cols-9 h-full gap-10">
          <SideBar />
          <div className="col-span-9 sm:col-span-8 md:col-span-8 lg:col-span-5 mx-2 rounded-2xl">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
