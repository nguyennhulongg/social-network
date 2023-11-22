import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const HeaderCommon: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className=" p-3">
      <div className="flex flex-row items-center">
        {showBackArrow && (
          <ArrowLeftOutlined
            onClick={handleBack}
            className="text-[#424242] hover:opacity-90 transition cursor-pointer mr-4"
          />
        )}
        <h1 className="text-[#424242] text-lg font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default HeaderCommon;
