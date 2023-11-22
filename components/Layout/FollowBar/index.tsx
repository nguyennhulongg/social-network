import AvatarComponent from "@/components/AvatarComponent";
import useUsers from "@/hooks/useUsers";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }
  return (
    <div className="col-span-2 hidden lg:block border-[#d9d9d9] border-[1px] rounded-2xl">
      <div className="">
        <h2 className="text-[#424242] font-bold text-[20px] py-4 px-6">
          Who to follow
        </h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user?.id} className="flex flex-row gap-3 ml-4">
              <AvatarComponent hasBorder userId={user?.id} />
              <div className="flex flex-col">
                <p className="text-[#424242] font-semibold text-sm">
                  {user.name}
                </p>
                <p className="text-neutral-400 text-sm">
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
