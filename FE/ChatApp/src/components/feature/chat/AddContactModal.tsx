import React, { useState } from 'react';
import type { Chat } from '@types';
import { ModalWrapper } from '@components/ui';
import { AddFriendForm ,AddGroupForm  } from '@components/forms';

interface AddContactModalProps {
  onClose: () => void;
  onAddChat: (chatData: Omit<Chat, 'id' | 'messages' | 'media' | 'links'>) => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
  onClose,
  onAddChat,
}) => {
  const [addTab, setAddTab] = useState<'friend' | 'group'>('friend');

  const handleAddFriend = (chatData: Omit<Chat, 'id' | 'messages' | 'media' | 'links'>) => {
    onAddChat(chatData);
    onClose();
  };

  const handleAddGroup = (chatData: Omit<Chat, 'id' | 'messages' | 'media' | 'links'> & {
    members: { name: string; initials: string }[];
  }) => {
    onAddChat(chatData);
    onClose();
  };

  return (
    <ModalWrapper title="Thêm liên hệ mới">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            className={`flex-1 py-2 px-4 rounded-lg ${
              addTab === 'friend' ? 'bg-blue-500' : 'bg-gray-700'
            } transition-colors`}
            onClick={() => setAddTab('friend')}
          >
            Thêm bạn
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg ${
              addTab === 'group' ? 'bg-blue-500' : 'bg-gray-700'
            } transition-colors`}
            onClick={() => setAddTab('group')}
          >
            Tạo nhóm
          </button>
        </div>

        {addTab === 'friend' ? (
          <AddFriendForm onAddFriend={handleAddFriend} />
        ) : (
          <AddGroupForm onAddGroup={handleAddGroup} />
        )}
      </div>
    </ModalWrapper>
  );
}; 