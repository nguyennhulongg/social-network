import HeaderCommon from "@/components/HeaderComponent";
import PostsFeed from "@/components/PostsComponent/PostsFeed";
import PostItem from "@/components/PostsComponent/PostsItem";
import UserBioCommon from "@/components/UserBioComponent";
import UserImageCommon from "@/components/UserImageComponent";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetcherUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetcherUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="Lightblue" size={80} />
      </div>
    );
  }

  return (
    <div>
      <HeaderCommon showBackArrow label={fetcherUser?.name} />
      <UserImageCommon userId={userId as string} />
      <UserBioCommon userId={userId as string} />
      <PostsFeed userId={userId as string} />
    </div>
  );
};

export default UserView;
