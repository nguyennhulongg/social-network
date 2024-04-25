import AvatarComponent from "@/components/AvatarComponent";
import ChatPopupCommon from "@/components/ChatPopupComponent";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useUsers from "@/hooks/useUsers";
import { MessageOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const [isOpenMsg, setIsOpenMsg] = useState(false);
  const [user, setUser] = useState();
  const [conversationId, setConversationId] = useState("");
  const {data: currentUser} = useCurrentUser()
  const loginModal = useLoginModal()

  if (users.length === 0) {
    return null;
  }

  const handleOpenPopupMsg = async (user: any) => {
    if (!currentUser) {
      loginModal.onOpen()
    }
    const conversation = await axios.post("/api/conversations", {
      userId: user?.id,
    });
    setConversationId(conversation?.data?.id);
    setIsOpenMsg(true);
    setUser(user);
  };

  return (
    <div className="col-span-2 hidden lg:block border-[#d9d9d9] border-[1px] rounded-2xl">
      <div className="">
        <h2 className="text-[#424242] font-bold text-[20px] py-4 px-6">
          Who to follow
        </h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div
              key={user?.id}
              className="flex flex-row gap-3 mx-5 justify-between"
            >
              <div className="flex flex-row gap-3">
                <AvatarComponent hasBorder userId={user?.id} />
                <div className="flex flex-col">
                  <p className="text-[#424242] font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-neutral-400 text-sm">@{user.username}</p>
                </div>
              </div>
              <div>
                <MessageOutlined
                  onClick={() => handleOpenPopupMsg(user)}
                  className="text-[#424242] hover:bg-[#42424223] bg-[#42424213] transition cursor-pointer p-2 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpenMsg && (
        <ChatPopupCommon
          conversationId={conversationId}
          currentUser={currentUser}
          user={user}
          setIsOpen={setIsOpenMsg}
        />
      )}
    </div>
  );
};

export default FollowBar;
