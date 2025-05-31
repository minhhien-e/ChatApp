import type { Chat, Message } from "@types";
import { formatTime } from "../../utils/chat";
import { create } from "zustand/react";

export interface ChatSlice {
  chats: Chat[];
  currentChatId: number;
  setCurrentChatId: (id: number) => void;
  addMessage: (chatId: number, message: Message) => void;
  addChat: (chat: Omit<Chat, "id" | "messages" | "media" | "links">) => void;
  updateChatPreview: (chatId: number, preview: string) => void;
  clearUnread: (chatId: number) => void;
}

const initialChats: Chat[] = [
  {
    id: 1,
    name: "Anh Duy",
    type: "friend",
    status: "Đang hoạt động",
    preview: "Bạn có rảnh không? Mình muốn hỏi...",
    time: "2 phút",
    unread: 3,
    avatar: "AD",
    online: true,
    messages: [
      {
        fromMe: false,
        text: "Chào bạn! Bạn có rảnh không?",
        time: "14:30",
      },
      {
        fromMe: false,
        text: "Mình muốn hỏi về dự án mới 😊",
        time: "14:30",
      },
      {
        fromMe: true,
        text: "Chào bạn! Mình đang rảnh đây",
        time: "14:32",
      },
      {
        fromMe: true,
        text: "Bạn cứ hỏi nhé, mình sẽ trả lời",
        time: "14:32",
      },
      {
        fromMe: false,
        text: "Cảm ơn bạn! Vậy về deadline của dự án...",
        time: "14:35",
      },
    ],
    media: [],
    links: [],
  },
];

const createChatSlice = (set: any): ChatSlice => ({
  chats: initialChats,
  currentChatId: initialChats[0].id,
  setCurrentChatId: (id) => set({ currentChatId: id }),
  addMessage: (chatId, message) =>
    set((state: any) => ({
      chats: state.chats.map((chat: any) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              preview: message.text,
              time: formatTime(),
              unread: chat.id === state.currentChatId ? 0 : chat.unread + 1,
            }
          : chat
      ),
    })),
  addChat: (chatData) =>
    set((state: any) => ({
      chats: [
        {
          id: Date.now(),
          messages: [],
          media: [],
          links: [],
          ...chatData,
        },
        ...state.chats,
      ],
    })),
  updateChatPreview: (chatId, preview) =>
    set((state: any) => ({
      chats: state.chats.map((chat: any) =>
        chat.id === chatId ? { ...chat, preview, time: formatTime() } : chat
      ),
    })),
  clearUnread: (chatId) =>
    set((state: any) => ({
      chats: state.chats.map((chat: any) =>
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      ),
    })),
});
export const useChatStore = create(createChatSlice);