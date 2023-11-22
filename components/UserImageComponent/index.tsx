import useUser from "@/hooks/useUser";
import React from "react";
import AvatarComponent from "../AvatarComponent";

interface IUserImageProps {
  userId: string;
}

const UserImageCommon: React.FC<IUserImageProps> = ({ userId }) => {
  const { data: fetcherUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative flex justify-center">
        {fetcherUser?.coverImage && (
          <img
            src={fetcherUser?.coverImage}
            alt="Cover Image"
            style={{ objectFit: "cover", height: '100%' }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
            <AvatarComponent userId={userId} hasBorder isLarge/>
        </div>
      </div>
    </div>
  );
};

export default UserImageCommon;
