import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import AvatarComponent from "../AvatarComponent";
import FormChatCommon from "../FormChatComponent";

const ChatPopupCommon = ({
  user,
  setIsOpen,
  conversationId,
  currentUser,
}: {
  user: any;
  setIsOpen: any;
  conversationId: string;
  currentUser: any;
}) => {
  const [messages, setMessages] = useState<any>([]);
  const fetchMsg = async () => {
    const res = await axios.get(`/api/messages/${conversationId}`);
    setMessages(res?.data);
  };

  useEffect(() => {
    fetchMsg();
  }, [conversationId]);

  return (
    <div className="fixed -bottom-10 right-5 main-children-bg !p-0 !pb-4 w-[280px]">
      <div className="main-bg-color p-2 rounded-t-xl flex w-full justify-between items-center">
        <div className="flex items-center">
          <AvatarComponent userId={user?.id} className="!h-8 !w-8" />
          <p className="text-[#424242] font-medium text-[14px] ml-2">
            {user?.name}
          </p>
        </div>
        <div>
          <CloseOutlined
            className="cursor-pointer hover:bg-[#4242422d] p-1 rounded-lg transition text-[#424242] mr-1"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
      <div className="px-2 h-[250px]  overflow-y-scroll">
        {messages?.map((msg: any) => (
          <div
            key={msg?.id}
            className={`flex my-2 ${
              msg?.senderId === currentUser?.id ? "justify-end" : ""
            }`}
          >
            {msg?.senderId !== currentUser?.id && (
              <AvatarComponent userId={msg?.senderId} className="!h-8 !w-8" />
            )}
            <p className="ml-1 px-2 py-2 bg-[#e2e2e2] rounded-xl text-[16px]">
              {msg?.body}
            </p>
          </div>
        ))}
      </div>
      <div className="px-2">
        <FormChatCommon conversationId={conversationId as string} />
      </div>
    </div>
  );
};

export default ChatPopupCommon;
