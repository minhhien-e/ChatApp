import React from 'react';
import type { Chat } from '@types';
import { getColor, getInitials } from '@utils/chat';

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, isActive, onClick }) => {
  return (
    <div
      className={`chat-item flex items-center gap-3 p-4 hover:bg-gray-700 cursor-pointer transition-colors ${
        isActive ? "bg-blue-900/30 border-r-4 border-blue-400" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`w-12 h-12 ${getColor(chat.name)} rounded-full flex items-center justify-center`}
        >
          <span className="font-semibold">{getInitials(chat.name)}</span>
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 ${
            chat.online ? "bg-green-500" : "bg-gray-500"
          } rounded-full border-2 border-gray-800`}
        ></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium truncate">{chat.name}</h4>
          <span className="text-xs text-gray-400">{chat.time}</span>
        </div>
        <p className="text-sm text-gray-400 truncate">{chat.preview}</p>
      </div>
      {chat.unread > 0 && (
        <div className="bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {chat.unread}
        </div>
      )}
    </div>
  );
}; 