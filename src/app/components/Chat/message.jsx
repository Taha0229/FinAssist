import React from "react";
import { Avatar } from "@nextui-org/react";
import ReactMarkdown from "react-markdown";

const Message = ({ message, by }) => {
  return (
    <div
      className={`px-4 py-2 text-lg rounded-lg flex flex-col gap-6 ${
        by === "human" ? "bg-blue-400 " : "bg-slate-100"
      }`}
    >
      <div className="flex text-lg font-bold gap-4">
        {by === "human" ? (
          <>
            <Avatar
              isBordered
              color="primary"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="relative"
            />
            <p>You</p>
          </>
        ) : (
          <div className="flex text-lg font-bold gap-4">
            <Avatar
              isBordered
              color="primary"
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="relative"
            />
            <p>Bot</p>
          </div>
        )}
      </div>

      <div className="px-2">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
