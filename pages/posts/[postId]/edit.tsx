import HeaderCommon from "@/components/HeaderComponent";
import EditPostCommon from "@/components/PostsComponent/EditPost";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";

const EditPostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: postData } = usePost(postId as string);

  return (
    <div>
      <HeaderCommon showBackArrow label={`Edit my post`} />
      <EditPostCommon />
    </div>
  );
};

export default EditPostPage;
