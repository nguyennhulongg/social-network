import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import AvatarComponent from "../AvatarComponent";
import ButtonCommon from "../ButtonComponent";
import usePost from "@/hooks/usePost";

interface IFormCommonProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const FormPostCommon: React.FC<IFormCommonProps> = ({
  placeholder,
  isComment,
  postId,
}) => {
  const textareaRef = useRef<any>(null);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body: body });

      toast.success("Success!");

      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="px-5 py-4  mb-5 border-[#d9d9d9] bg-white border-[1px] rounded-2xl">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <AvatarComponent hasBorder userId={currentUser?.id} />
          </div>
          <div className="w-full">
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
                resize-none
                bg-[#ffffff] 
                border-[#d9d9d9]
                border-[1px]
                outline-none 
                text-[16px] 
                rounded-2xl
                placeholder-[#424242]-500 
                text-[#424242]
            "
              placeholder={placeholder}
            ></textarea>
            <div className="mt-4 flex flex-row justify-end">
              <ButtonCommon
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Post"
                className="text-[16px] px-5 py-[5px] !mx-0 font-medium"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-[#424242] text-2xl text-center mb-4 font-bold">
            Welcome to Post
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <ButtonCommon
              label="Login"
              onClick={loginModal.onOpen}
              className="px-10"
            />
            <ButtonCommon
              label="Register"
              onClick={registerModal.onOpen}
              secondary
              className="px-10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPostCommon;
