import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import AvatarComponent from "../AvatarComponent";
import ButtonCommon from "../ButtonComponent";

interface IFormCommentProps {
  placeholder: string;
  postId: string;
}

const FormCommentCommon: React.FC<IFormCommentProps> = ({
  placeholder,
  postId,
}) => {
  const textareaRef = useRef<any>(null);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePost(postId as string);
  const { mutate: mutatePosts } = usePosts();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = `/api/comments?postId=${postId}`;

      await axios.post(url, { body });

      toast.success("Commented!");

      setBody("");
      mutatePost();
      mutatePosts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePost, mutatePosts, postId]);

  return (
    <div className="mb-0 mt-5">
      <div className="flex flex-row gap-4">
        <div>
          <AvatarComponent hasBorder userId={currentUser?.id} />
        </div>
        <div
          className="w-full bg-[#ffffff] 
                border-[#d9d9d9]
                border-[1px]
                rounded-2xl
                pb-1
                "
        >
          <textarea
            disabled={isLoading}
            ref={textareaRef}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
              }
            }}
            className="
                disabled:opacity-80
                w-full 
                px-5
                pt-1
                min-h-10
                outline-none 
                resize-none
                rounded-2xl
                text-[16px] 
                placeholder-[#424242]-500 
                text-[#424242]
            "
            placeholder={placeholder}
          ></textarea>
          <div className="flex flex-row justify-end">
            <ButtonCommon
              disabled={isLoading || !body}
              onClick={onSubmit}
              label=""
              icon={<SendOutlined />}
              className="text-[16px] px-4 py-3 mr-2 !bg-transparent !text-[#424242] rounded-full transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCommentCommon;
