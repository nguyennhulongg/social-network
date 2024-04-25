import { PictureTwoTone, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useRef, useState } from "react";
import ButtonCommon from "../ButtonComponent";


const FormChatCommon = ({ conversationId }: { conversationId: string }) => {
  const [body, setBody] = useState("");
  const textareaRef = useRef<any>(null);

  const onSubmit = async () => {
    await axios.post("/api/messages", { message: body, conversationId });
    setBody('')
  };


  const handleUpload = (result: any) => {
    // axios.post('/api/messages', {
    //   image: result.info.secure_url,
    //   conversationId: conversationId
    // })
    console.log(result);
  };

  return (
    <div className="mb-0 mt-5 flex justify-between gap-2 items-center">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="drwcjz9z"
      >
        <PictureTwoTone className="text-[20px] cursor-pointer" />
      </CldUploadButton>
      <div className="flex flex-row gap-4 w-full">
        <div
          className="w-full bg-[#ffffff] 
                border-[#d9d9d9]
                border-[1px]
                rounded-2xl
                flex
                justify-between
                px-2
                py-1
                "
        >
          <textarea
            value={body}
            ref={textareaRef}
            onChange={(e) => {
              setBody(e.target.value);
              if (textareaRef.current) {
                textareaRef.current.style.height = "25px";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
              }
            }}
            className="
                disabled:opacity-80
                outline-none 
                resize-none
                placeholder-[#424242]-500 
                text-[#424242]
                text-[15px]
                w-full
                px-2
                box-border
                h-[25px]
                overflow-hidden
            "
            placeholder="Aa"
          />
          <div className="flex items-center">
            <ButtonCommon
              disabled={!body}
              onClick={onSubmit}
              label=""
              icon={<SendOutlined className="flex items-center" />}
              className="text-[14px] !bg-transparent !text-[#424242] hover:!bg-[#42424225] !p-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormChatCommon;
