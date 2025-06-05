import React, { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store";
import { Sidebar } from "../../components/feature/chat/Sidebar";
import { ChatHeader } from "../../components/feature/chat/ChatHeader";
import { Message } from "../../components/feature/chat/Message/Message";
import { MessageInput } from "../../components/feature/chat/MessageInput";
import { ChatInfo } from "../../components/feature/chat/ChatInfo";
import { formatTime, getColor, getInitials } from "../../utils/chat";
export const ChatPage: React.FC = () => {
  const {
    chats,
    currentChatId,
    setCurrentChatId,
    addMessage,
    addChat,
    clearUnread,
  } = useChatStore();

  const [showInfo, setShowInfo] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Đúng type Chat
  const currentChat = chats.find((c) => c.id === currentChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChatId, currentChat?.messages]);

  useEffect(() => {
    if (typing) {
      const timer = setTimeout(() => {
        setTyping(false);
        handleReceiveMessage("Cảm ơn tin nhắn của bạn! 😊");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [typing]);

  const handleSendMessage = (text: string) => {
    if (!currentChat) return;
    const msg = {
      fromMe: true,
      text,
      time: formatTime(),
    };
    addMessage(currentChat.id, msg);
    setTimeout(() => setTyping(true), 1000);
  };

  const handleReceiveMessage = (text: string) => {
    if (!currentChat) return;
    const msg = {
      fromMe: false,
      text,
      time: formatTime(),
    };
    addMessage(currentChat.id, msg);
  };

  const handleChatSelect = (id: number) => {
    setCurrentChatId(id);
    setShowInfo(false);
    clearUnread(id);
  };

  return (
    <div className="flex h-screen font-sans bg-gray-900 text-white">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
        onAddChat={addChat}
      />

      <div className="flex-1 flex flex-col bg-gray-900 relative">
        {currentChat ? (
          <>
            <ChatHeader chat={currentChat} onToggleInfo={() => setShowInfo((v) => !v)} />

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar chat-messages">
              {currentChat.messages.map((msg, i) => (
                <Message key={i} message={msg} chatName={currentChat.name} />
              ))}
              {typing && (
                <div className="flex mb-4">
                  <div
                    className={`w-8 h-8 ${getColor(
                      currentChat.name
                    )} rounded-full flex items-center justify-center mr-2`}
                  >
                    <span className="text-sm font-semibold">
                      {getInitials(currentChat.name)}
                    </span>
                  </div>
                  <div className="max-w-[70%] flex items-end gap-2">
                    <div className="bg-gray-700 rounded-bl-sm rounded-lg p-3 flex gap-1 items-center">
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <MessageInput onSendMessage={handleSendMessage} />

            {showInfo && <ChatInfo chat={currentChat} onClose={() => setShowInfo(false)} />}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Hãy chọn một đoạn chat để bắt đầu!
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        .message-animation {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

