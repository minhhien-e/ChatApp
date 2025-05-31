interface MessageTimeProps {
  time: string;
  fromMe: boolean;
}

export const MessageTime: React.FC<MessageTimeProps> = ({ time, fromMe }) => (
  <div className="flex flex-col items-end">
    <span className="text-xs text-gray-400">{time}</span>
    {fromMe && <span className="text-xs text-gray-400">✓✓</span>}
  </div>
);
