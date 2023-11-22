import useNotification from "@/hooks/useNotification";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { ClipLoader } from "react-spinners";

interface INotificationPopupProps {
  setIsOpen: any;
  userId: string;
}

const NotificationPopupCommon: React.FC<INotificationPopupProps> = ({
  setIsOpen,
  userId,
}) => {
  const { data: notiData, isLoading } = useNotification(userId);

  return (
    <div className="absolute top-[100px] left-5 bg-white border-[#d9d9d9] border-[1px] rounded-2xl w-[300px] px-5 py-2">
      <div className="flex items-center text-[#424242] text-[14px] font-semibold w-full justify-end">
        <Link href="/notifications" className="hover:underline transition mr-2">
          All notifications
        </Link>
        <p>
          <CloseOutlined
            className="cursor-pointer hover:bg-[#4242422d] p-1 rounded-lg transition"
            onClick={() => setIsOpen(false)}
          />
        </p>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center h-full">
          <ClipLoader />
        </div>
      ) : (
        <div>
          {notiData?.slice(0, 10).map((item: any) => (
            <div
              key={item?.id}
              className="border-[#d9d9d9] border-b-[1px] last-of-type:border-none py-2"
            >
              <p className="text-[#424242] text-[14px]">{item?.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPopupCommon;
