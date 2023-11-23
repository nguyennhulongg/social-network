import usePosts from "@/hooks/usePosts";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const PostSettingPopupCommon = ({ data, currentUser }: any) => {
  const router = useRouter();
  const { mutate: mutatePost } = usePosts();

  const settingItem = [
    {
      label: "Go to post",
      key: "detail",
      onClick: () => {
        router.push(`/posts/${data?.id}`);
      },
    },
    data?.userId === currentUser?.id
      ? {
          label: "Edit post",
          key: "edit",
          onClick: () => {
            router.push(`/posts/${data?.id}/edit`);
          },
        }
      : {},
    data?.userId === currentUser?.id
      ? {
          icon: <DeleteOutlined />,
          label: "Delete this post!",
          key: "delete",
          onClick: async () => {
            try {
              await axios.delete(`/api/posts/${data?.id}`);
              toast.success("Delete post success");
              mutatePost();
            } catch (error) {
              console.log(error);
            }
          },
        }
      : {},
  ];

  return (
    <div className="bg-white absolute right-3 top-8 border-[#d9d9d9] border-[1px] min-w-[200px] rounded-lg py-2 px-2">
      {settingItem.map((item, index) => (
        <div
          key={index}
          className={`${
            item.key === "delete"
              ? "text-[red] border-[#d9d9d9] border-t-[1px] pt-2 mt-2"
              : "text-[#424242]"
          } flex items-center text-[14px] cursor-pointer hover:underline transition`}
          onClick={item?.onClick}
        >
          {item.icon}
          <p className="ml-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default PostSettingPopupCommon;
