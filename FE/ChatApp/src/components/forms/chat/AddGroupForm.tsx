import React, { useState } from "react";
import { getInitials } from "@utils/chat";
import type { Chat } from "@types";

interface AddGroupFormProps {
  onAddGroup: (
    chatData: Omit<Chat, "id" | "messages" | "media" | "links"> & {
      members: { name: string; initials: string }[];
    }
  ) => void;
}

export const AddGroupForm: React.FC<AddGroupFormProps> = ({ onAddGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  const addMember = () => {
    if (memberInput.trim() && !members.includes(memberInput.trim())) {
      setMembers([...members, memberInput.trim()]);
      setMemberInput("");
    }
  };

  const handleAddGroup = () => {
    if (!groupName.trim() || members.length === 0) return;
    onAddGroup({
      name: groupName.trim(),
      type: "group",
      status: `${members.length} thành viên`,
      preview: "Nhóm mới được tạo",
      time: "Mới",
      unread: 0,
      avatar: getInitials(groupName.trim()),
      online: true,
      members: members.map((m) => ({
        name: m,
        initials: getInitials(m),
      })),
    });
    setGroupName("");
    setMembers([]);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Tên nhóm
        </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Thêm thành viên
        </label>
        <div className="relative">
          <input
            type="text"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addMember();
              }
            }}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addMember}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-600 p-1 rounded-full"
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
        </div>
      </div>
      <div className="space-y-2">
        {members.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-700 rounded-lg px-3 py-2"
          >
            <span className="text-sm">{m}</span>
            <button
              onClick={() => setMembers(members.filter((name) => name !== m))}
              className="hover:bg-gray-600 p-1 rounded-full"
            >
              <svg
                className="w-4 h-4"
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
        ))}
      </div>
      <button
        onClick={handleAddGroup}
        className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition-colors"
      >
        Xác nhận
      </button>
    </div>
  );
};
