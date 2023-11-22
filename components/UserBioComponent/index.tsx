import useUser from "@/hooks/useUser";
import React, { useMemo } from "react";
import ButtonCommon from "../ButtonComponent";
import useCurrentUser from "@/hooks/useCurrentUser";
import { format } from "date-fns";
import { CalendarOutlined } from "@ant-design/icons";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

interface IUserBioProps {
  userId: string;
}

const UserBioCommon: React.FC<IUserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { isFollowing, toggleFollow } = useFollow(userId);
  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser?.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <ButtonCommon
            secondary
            className="text-[#fff] py-[5px] px-[20px] rounded-3xl"
            label="Edit"
            onClick={editModal.onOpen}
          />
        ) : (
          <ButtonCommon
            onClick={toggleFollow}
            className="text-[#fff] py-[5px] px-[20px] rounded-3xl"
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-[#424242] text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-[#424242]">{fetchedUser?.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <CalendarOutlined />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-[#424242]">
              {fetchedUser?.followingIds?.length}
            </p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-[#424242]">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBioCommon;
