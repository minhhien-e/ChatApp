interface MessageBubbleProps {
  fromMe: boolean;
  text: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ fromMe, text }) => (
  <div className={`rounded-lg p-3 ${
    fromMe
      ? "bg-blue-500 rounded-br-sm text-white"
      : "bg-gray-700 rounded-bl-sm text-white"
  }`}>
    <p>{text}</p>
  </div>
);
