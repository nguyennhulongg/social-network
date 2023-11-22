import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const NotificationCommon = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const [notiData, setNotiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNoti = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/notifications/${currentUser?.id}`);
      setNotiData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    mutateCurrentUser();
    fetchNoti();
  }, [mutateCurrentUser]);
  return (
    <div className="bg-white border-[#d9d9d9] border-[1px] rounded-xl">
      {isLoading ? (
        <div className="w-full flex justify-center h-full">
          <ClipLoader />
        </div>
      ) : (
        <div>
          {notiData?.map((item: any) => (
            <div
              key={item?.id}
              className="border-[#d9d9d9] border-b-[1px] last-of-type:border-none py-4 px-5"
            >
              <p className="text-[#424242] text-[14px]">{item?.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCommon;
