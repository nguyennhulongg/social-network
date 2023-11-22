import usePost from "@/hooks/usePost";
import React from "react";
import AvatarComponent from "../AvatarComponent";

interface ICommentProps {
  postId: string;
  isDetailPost?: boolean;
}

const CommentListComment: React.FC<ICommentProps> = ({
  postId,
  isDetailPost,
}) => {
  const { data: postData } = usePost(postId);

  return (
    <div>
      {!isDetailPost ? (
        <div className="flex">
          <AvatarComponent
            hasBorder
            userId={postData?.comments[0]?.userId}
            className="!h-8 !w-8"
          />
          <div className="ml-3 w-full bg-[#ffffff] border-[#d9d9d9] border-[1px] rounded-2xl px-2 pb-2 ">
            <a
              href={`/users/${postData?.comments[0]?.userId}`}
              className="font-semibold text-[#494949] text-[14px]"
            >
              {postData?.comments[0]?.user?.name}
            </a>

            <p className="text-[#424242]">{postData?.comments[0]?.body}</p>
          </div>
        </div>
      ) : (
        <div>
          {postData?.comments?.map((item: any) => (
            <div className="flex my-5" key={item?.id}>
              <AvatarComponent
                hasBorder
                userId={item?.userId}
                className="!h-8 !w-8"
              />
              <div className="ml-3 w-full bg-[#ffffff] border-[#d9d9d9] border-[1px] rounded-2xl px-2 pb-2">
                <a
                  href={`/users/${item?.userId}`}
                  className="font-semibold text-[#494949] text-[14px]"
                >
                  {item?.user?.name}
                </a>

                <p className="text-[#424242]">{item?.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentListComment;
