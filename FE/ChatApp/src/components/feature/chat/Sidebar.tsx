import React, { useState } from "react";
import type { Chat } from "@types";
import { ChatItem } from "./ChatItem";
import { AddContactModal } from "./AddContactModal";
import { useDialogStore } from "@/store";

interface SidebarProps {
  chats: Chat[];
  currentChatId: number;
  onChatSelect: (id: number) => void;
  onAddChat: (
    chatData: Omit<Chat, "id" | "messages" | "media" | "links">
  ) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChatId,
  onChatSelect,
  onAddChat,
}) => {
  const [search, setSearch] = useState("");
  const { isOpen, openDialog, closeDialog } = useDialogStore();

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center font-bold">
              HM
            </div>
            <div>
              <h3 className="font-semibold">HuynhMinhHien-22130080</h3>
              <p className="text-sm text-gray-400">Đang hoạt động</p>
            </div>
          </div>
          <div className="flex gap-2 header-actions">
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Thêm bạn hoặc tạo nhóm"
              onClick={openDialog}
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar chat-list">
        {chats
          .filter(
            (chat) =>
              chat.name.toLowerCase().includes(search.toLowerCase()) ||
              chat.preview.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === currentChatId}
              onClick={() => onChatSelect(chat.id)}
            />
          ))}
      </div>

      {/* Add Contact Modal */}
      {isOpen && (
        <AddContactModal onClose={closeDialog} onAddChat={onAddChat} />
      )}
    </div>
  );
};
