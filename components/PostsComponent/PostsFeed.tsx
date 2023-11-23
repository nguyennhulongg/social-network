import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostsItem";
import { ClipLoader } from "react-spinners";
interface IPostsFeedProps {
  userId?: string;
}

const PostsFeed: React.FC<IPostsFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId as string);

  return (
    <div>
      <div>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <ClipLoader />
          </div>
        ) : (
          <div>
            {posts.map((post: Record<string, any>) => (
              <PostItem userId={userId} key={posts?.id} data={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsFeed;
