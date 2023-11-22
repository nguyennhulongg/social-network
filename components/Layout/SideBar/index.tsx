import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import {
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import SideBarLogo from "../SideBarLogo";
import NotificationCommon from "@/components/NotificationsPopupComponent";
import NotificationPopupCommon from "@/components/NotificationsPopupComponent";

const SideBar = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const [isOpenPopupNotification, setIsOpenPopupNotification] =
    useState<boolean>(false);

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [loginModal, router, currentUser]);
  const items = [
    {
      label: "Home",
      href: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: <NotificationOutlined />,
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: <UserOutlined />,
    },
  ];

  const handleClickItemSideBar = (href: string) => {
    if (href === "/notifications") {
      setIsOpenPopupNotification(!isOpenPopupNotification ? true : false);
    } else {
      router.push(href);
    }
  };

  return (
    <div className="col-span-1 min-w-[80px] hidden sm:block lg:col-span-2 pb-10 md:block lg:w-auto h-full pr-4 md:pr-1 ">
      <div className="flex flex-col sm:w-[60px] md:w-[80px] lg:w-[220px] xl:w-[250px] 2xl:w-[300px] sticky top-0 border-[#d9d9d9] border-[1px] rounded-2xl">
        <div className="space-y-2 flex flex-col items-center lg:block pb-5">
          <SideBarLogo />
          <div className="px-1 rounded-md py-3 relative">
            {items.map((item, index) => (
              <div
                key={index}
                className="text-[#424242] flex items-center justify-center md:justify-start lg:justify-start py-3 font-semibold rounded-lg transition px-2 cursor-pointer hover:bg-[#0000001e]"
                onClick={() => handleClickItemSideBar(item.href)}
              >
                <p className="pr-1 lg:pr-3 text-[20px] flex items-center relative">
                  {item.icon}
                  {currentUser?.hasNotification &&
                    item.label === "Notifications" && (
                      <span className="bg-red-500 h-[10px] w-[10px] rounded-full mr-5 absolute left-3 bottom-3"></span>
                    )}
                </p>
                <p className="overflow-hidden w-full text-ellipsis hidden sm:hidden md:hidden lg:block">
                  {item.label}
                </p>
              </div>
            ))}
            {isOpenPopupNotification && (
              <NotificationPopupCommon userId = {currentUser.id} setIsOpen={setIsOpenPopupNotification} />
            )}
            <div>
              {currentUser && (
                <div
                  className="text-[#424242] flex justify-center md:justify-start lg:justify-start py-3 font-semibold rounded-lg transition px-2 cursor-pointer hover:bg-[#0000001e]"
                  onClick={() => signOut()}
                >
                  <p className="pr-1 lg:pr-3 text-[20px] flex items-center">
                    <LogoutOutlined />
                  </p>
                  <p className="overflow-hidden w-full text-ellipsis hidden sm:hidden md:hidden lg:block">
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <button
              onClick={onClick}
              className="bg-[#18c4af] text-[#EEEEEE] transition hover:bg-[#078a91] cursor-pointer font-bold text-center py-2 w-[42px] h-[40px] rounded-[50%] lg:w-[50%] lg:mx-auto lg:rounded-3xl"
            >
              <p className="flex lg:hidden items-center justify-center">
                <FormOutlined />
              </p>
              <p className="hidden sm:hidden md:hidden lg:block">Create</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
