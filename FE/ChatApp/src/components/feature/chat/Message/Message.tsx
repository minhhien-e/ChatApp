import { Avatar } from "./Avatar";
import { MessageBubble } from "./MessageBubble";
import { MessageTime } from "./MessageTime";
import type { Message as MessageType } from "@types";

interface MessageProps {
  message: MessageType;
  chatName: string;
}
export const Message: React.FC<MessageProps> = ({ message, chatName }) => {
  return (
    <div
      className={`flex mb-4 message-animation ${
        message.fromMe ? "justify-end" : ""
      }`}
    >
      {!message.fromMe && <Avatar name={chatName} />}
      <div className="max-w-[70%] flex items-end gap-2">
        <MessageBubble fromMe={message.fromMe} text={message.text} />
        <MessageTime time={message.time} fromMe={message.fromMe} />
      </div>
    </div>
  );
};
