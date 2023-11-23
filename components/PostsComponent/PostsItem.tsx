import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useRef, useState } from "react";
import AvatarComponent from "../AvatarComponent";
import {
  CommentOutlined,
  EllipsisOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import useLike from "@/hooks/useLike";
import FormCommentCommon from "../FormCommentComponent";
import CommentListComment from "../CommentListComponent";
import PostSettingPopupCommon from "./PostSettingPopup";

interface IPostProps {
  data?: Record<string, any>;
  userId?: string | any;
  isDetailPost?: boolean;
}

const PostItem: React.FC<IPostProps> = ({
  data = {},
  userId,
  isDetailPost = false,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const likeRef = useRef<any>(null);
  const commentFormRef = useRef<any>(null);
  const [isComment, setIsComment] = useState(false);
  const [isSettingPopup, setIsSettingPopup] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { toggleLike, hasLiked } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`users/${data?.user?.id}`);
    },
    [router, data?.user?.id]
  );

  const handleLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        loginModal.onOpen();
      }
      if (likeRef.current) {
        likeRef.current.style.transform = "rotate(-15deg)";
        likeRef.current.style.fontSize = "18px";
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, []);

  const itemAction = [
    {
      icon: !hasLiked ? (
        <LikeOutlined ref={likeRef} />
      ) : (
        <LikeFilled ref={likeRef} style={{ transition: "0.15s" }} />
      ),
      key: "like",
      label: "Like",
      action: handleLike,
    },
    {
      icon: <CommentOutlined />,
      label: "Comment",
      key: "comment",
      action: () => {
        if (isComment) {
          setIsComment(false);
        } else {
          if (commentFormRef.current) {
            commentFormRef.current.scrollIntoView({ behavior: "smooth" });
          }
          if (!currentUser) {
            loginModal.onOpen();
          } else {
            setIsComment(true);
          }
        }
      },
    },
    { icon: <ShareAltOutlined />, label: "Share", action: () => {} },
  ];

  return (
    <div className="main-children-bg">
      <div>
        <div className="flex justify-between relative">
          <div className="flex">
            <AvatarComponent
              hasBorder
              className="h-10 w-10"
              userId={data?.user?.id}
            />
            <div className="ml-2">
              <p
                className="text-common font-semibold cursor-pointer hover:text-[#555555] transition"
                onClick={goToUser}
              >
                {data?.user?.name}
              </p>
              <div className="flex">
                <p className="text-neutral-400 text-sm mr-2">
                  @{data?.user?.username}
                </p>
                <p className="text-neutral-400 text-sm">{createdAt}</p>
              </div>
            </div>
          </div>
          <div className="pt-1 px-3 hover:bg-[#4242421f] cursor-pointer transition rounded-full">
            <EllipsisOutlined
              onClick={() => setIsSettingPopup(!isSettingPopup ? true : false)}
            />
          </div>
          {isSettingPopup && (
            <PostSettingPopupCommon data={data} currentUser={currentUser} />
          )}
        </div>
        <div className="mt-2 mb-2">
          <p className="text-common font-normal !text-[16px] break-words">
            {data?.body}
          </p>
        </div>
      </div>
      {data?.image && (
        <div>
          <img className="w-full rounded-lg" src={data?.image} alt="Image" />
        </div>
      )}
      <div className="flex justify-between">
        {data?.likeIds?.length !== 0 ? (
          <div className="text-[#616161] text-[12px] font-medium flex items-center">
            <LikeFilled style={{ color: "#18c4af" }} />
            <p className="ml-1">{data?.likedIds?.length}</p>
          </div>
        ) : (
          <div></div>
        )}
        {data?.comments?.length > 0 ? (
          <div className="flex items-center text-[#616161] text-[12px] font-medium">
            <p className="mr-1">{data?.comments?.length}</p>
            <p>{data?.comments?.length === 1 ? "Comment" : "Comments"}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex justify-around border-t-[1px] border-b-[1px] border-[#d9d9d9] mt-1 py-1 mb-5">
        {itemAction.map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            className={`flex items-center cursor-pointer hover:bg-[#80808015] w-[130px] justify-center rounded-lg py-1 transition
            ${
              hasLiked && item.key === "like"
                ? "!text-[#18c4af]"
                : "text-[#424242]"
            }
            ${
              isComment && item.key === "comment"
                ? "!text-[#18c4af]"
                : "text-[#424242]"
            }`}
          >
            {item.icon}
            <p className="ml-2">{item.label}</p>
          </div>
        ))}
      </div>
      {data?.comments?.length !== 0 && (
        <CommentListComment isDetailPost={isDetailPost} postId={data.id} />
      )}
      {isComment ||
        (isDetailPost && (
          <div ref={commentFormRef}>
            <FormCommentCommon placeholder="Comment..." postId={data.id} />
          </div>
        ))}
    </div>
  );
};

export default PostItem;
