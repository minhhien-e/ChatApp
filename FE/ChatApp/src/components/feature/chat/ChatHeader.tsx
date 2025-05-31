import React from 'react';
import type { Chat } from '@types';
import { getColor, getInitials } from '@utils/chat';

interface ChatHeaderProps {
  chat: Chat;
  onToggleInfo: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onToggleInfo }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 chat-header">
      <div className="flex items-center gap-3 chat-header-info">
        <div className="relative chat-header-avatar">
          <div
            className={`w-10 h-10 ${getColor(
              chat.name
            )} rounded-full flex items-center justify-center`}
          >
            <span className="font-semibold">
              {getInitials(chat.name)}
            </span>
          </div>
          <div
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${
              chat.online ? "bg-green-500" : "bg-gray-500"
            } rounded-full border-2 border-gray-900`}
          ></div>
        </div>
        <div className="chat-header-details">
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-sm text-gray-400">{chat.status}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title="Gọi thoại"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
        <button
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title="Gọi video"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title="Thông tin"
          onClick={onToggleInfo}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}; 