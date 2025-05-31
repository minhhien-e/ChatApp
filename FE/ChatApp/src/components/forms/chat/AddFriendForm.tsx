import React, { useState } from 'react';
import { getInitials } from '@utils/chat';
import type { Chat } from '@types';

interface AddFriendFormProps {
  onAddFriend: (chatData: Omit<Chat, 'id' | 'messages' | 'media' | 'links'>) => void;
}

export const AddFriendForm: React.FC<AddFriendFormProps> = ({ onAddFriend }) => {
  const [friendInput, setFriendInput] = useState('');

  const handleAddFriend = () => {
    if (!friendInput.trim()) return;
    onAddFriend({
      name: friendInput.trim(),
      type: 'friend',
      status: 'Vừa thêm',
      preview: 'Click để bắt đầu trò chuyện',
      time: 'Mới',
      unread: 0,
      avatar: getInitials(friendInput.trim()),
      online: false,
    });
    setFriendInput('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Tên người dùng hoặc Email
        </label>
        <input
          type="text"
          value={friendInput}
          onChange={(e) => setFriendInput(e.target.value)}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleAddFriend}
        className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition-colors"
      >
        Xác nhận
      </button>
    </div>
  );
};
