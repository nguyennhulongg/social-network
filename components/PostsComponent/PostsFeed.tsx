import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostsItem";

interface IPostsFeedProps {
  userId?: string;
}

const PostsFeed: React.FC<IPostsFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId as string);

  return (
    <div>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={posts?.id} data={post} />
      ))}
    </div>
  );
};

export default PostsFeed;
