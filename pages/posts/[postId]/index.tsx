import HeaderCommon from "@/components/HeaderComponent";
import PostItem from "@/components/PostsComponent/PostsItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: postData } = usePost(postId as string);

  return (
    <div>
      <HeaderCommon showBackArrow label={`${postData?.user?.name}'s post`} />
      <PostItem data={postData} userId={postData?.userId} isDetailPost />
    </div>
  );
};

export default PostDetail;
