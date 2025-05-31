import React from 'react';
import type { Chat } from '@types';
import { getColor, getInitials } from '@utils/chat';

interface ChatInfoProps {
  chat: Chat;
  onClose: () => void;
}

export const ChatInfo: React.FC<ChatInfoProps> = ({ chat, onClose }) => {
  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 fixed right-0 top-0 h-screen z-40 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Thông tin hội thoại</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Profile Section */}
        <div className="p-4 text-center border-b border-gray-700">
          <div className="relative inline-block">
            <div
              className={`w-24 h-24 ${getColor(
                chat.name
              )} rounded-full flex items-center justify-center mx-auto mb-3`}
            >
              <span className="text-2xl font-bold">
                {getInitials(chat.name)}
              </span>
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <h2 className="text-xl font-semibold mb-1">{chat.name}</h2>
          <p className="text-sm text-gray-400">{chat.status}</p>
        </div>

        {/* Customize Chat Section */}
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">
            Tùy chỉnh đoạn chat
          </h4>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <span>Đổi chủ đề</span>
            </button>
            <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span>Thêm thành viên</span>
            </button>
          </div>
        </div>

        {/* Members for Groups */}
        {chat.type === 'group' && (
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">
              Thành viên nhóm
            </h4>
            <div className="space-y-3">
              {chat.members && chat.members.length > 0 ? (
                chat.members.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${getColor(
                        m.name
                      )} rounded-full flex items-center justify-center`}
                    >
                      <span className="font-semibold">
                        {getInitials(m.name)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{m.name}</h4>
                      <p className="text-sm text-gray-400">
                        {m.isAdmin ? 'Admin' : 'Thành viên'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <span>Chưa có thành viên</span>
              )}
            </div>
          </div>
        )}

        {/* Media */}
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">
            File phương tiện được chia sẻ
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {chat.media && chat.media.length > 0 ? (
              chat.media.map((item, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={item.url}
                    alt="media"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <span className="col-span-3 text-gray-500 text-xs">
                Chưa có media
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="p-4 border-b border-gray-700">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">
            Liên kết được chia sẻ
          </h4>
          <div className="space-y-3">
            {chat.links && chat.links.length > 0 ? (
              chat.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <h4 className="font-medium mb-1 truncate">{link.title}</h4>
                  <p className="text-sm text-gray-400 truncate">
                    {link.preview}
                  </p>
                  <span className="text-xs text-gray-500">{link.date}</span>
                </a>
              ))
            ) : (
              <span className="text-xs text-gray-500">Chưa có liên kết</span>
            )}
          </div>
        </div>

        {/* Privacy & Support */}
        <div className="p-4">
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-500">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
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
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
              <span>Chặn</span>
            </button>
            <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-500">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <span>Xóa đoạn chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 