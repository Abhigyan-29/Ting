import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { motion, AnimatePresence } from "framer-motion";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (!selectedUser?._id || !messageEndRef.current) return;
    messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, selectedUser?._id]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar relative">
        <AnimatePresence mode="popLayout">
          {messages.length > 0 && !isMessagesLoading ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg, index) => {
                const isSentByMe = msg.senderId === authUser?._id;
                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.23, 1, 0.32, 1],
                      delay: index > messages.length - 10 ? (index - (messages.length - 10)) * 0.05 : 0 
                    }}
                    className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-xl relative overflow-hidden ${
                        isSentByMe
                          ? "bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-br-sm shadow-rose-600/20"
                          : "bg-white/5 backdrop-blur-xl border border-white/5 text-zinc-300 rounded-bl-sm"
                      }`}
                    >
                      {/* GLASS EFFECT FOR SENT MESSAGES */}
                      {isSentByMe && (
                        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                      )}

                      {msg.image && (
                        <motion.img
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          src={msg.image}
                          alt="Shared content"
                          className="rounded-xl w-full max-h-72 object-cover mb-2 border border-white/10"
                        />
                      )}
                      
                      {msg.text && (
                        <p className="text-[15px] leading-relaxed relative z-10 font-medium">
                          {msg.text}
                        </p>
                      )}
                      
                      <div className={`mt-1.5 flex items-center gap-1.5 opacity-60 text-[10px] uppercase tracking-wider font-bold ${isSentByMe ? "justify-end" : "justify-start"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {isSentByMe && <span>• Read</span>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messageEndRef} className="h-4" />
            </div>
          ) : isMessagesLoading ? (
            <MessagesLoadingSkeleton />
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser?.fullName || "User"} />
          )}
        </AnimatePresence>
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
