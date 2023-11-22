import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  className?: string;
}

const AvatarComponent: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
  className
}) => {
  const { data: fetcherUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`${className} ${hasBorder ? "border-[1px] border-black" : ""} ${
        isLarge ? "h-32 w-32" : "h-10 w-10"
      } rounded-full hover:opacity-90 transition cursor-pointer`}
    >
      <img
        onClick={onClick}
        style={{ objectFit: "cover", borderRadius: "100%", height: "100%" }}
        src={fetcherUser?.profileImage || "/images/placeholder.png"}
        alt="Avatar"
      />
    </div>
  );
};

export default AvatarComponent;
