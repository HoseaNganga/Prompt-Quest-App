"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const UserPromptCard = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(data.prompt);
    navigator.clipboard.writeText(data.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const handleProfileClick = () => {
    if (data.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${data.creator._id}?name=${data.creator.username}`);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-start items-start gap-5 ">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={data.creator.image}
            alt="userPic"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{data.creator.username}</h3>
            <p className="text-sm text-gray-400 ">{data.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === data.prompt
                ? `/assets/icons/tick.svg`
                : `/assets/icons/copy.svg`
            }
            alt="copyBtn"
            width={14}
            height={14}
          />
        </div>
      </div>
      <p className="my-4 dark:text-slate-500">{data.prompt}</p>
      <p
        className="blue_gradient cursor-pointer dark:text-slate-500"
        onClick={() => handleTagClick && handleTagClick(data.tag)}
      >
        {data.tag}
      </p>
      {session?.user.id === data.creator._id && pathName === "/profile" && (
        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            className="text-sm cursor-pointer black_btn"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="text-sm cursor-pointer outline_btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPromptCard;
