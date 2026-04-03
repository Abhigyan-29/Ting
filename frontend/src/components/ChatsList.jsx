import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-3">
      {chats.map((chat, index) => (
        <motion.div
          key={chat._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={`group flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent ${
            selectedUser?._id === chat._id
              ? "bg-rose-600/10 border-rose-500/20 shadow-lg shadow-rose-600/5"
              : "hover:bg-white/5 hover:border-white/5"
          }`}
          onClick={() => setSelectedUser(chat)}
        >
          {/* AVATAR */}
          <div className="relative">
            <div className="size-12 rounded-xl overflow-hidden border border-white/5 group-hover:border-rose-500/30 transition-colors">
              <img
                src={chat.profilePic || "/avatar.png"}
                alt={chat.fullName}
                className="size-full object-cover"
              />
            </div>
            {onlineUsers.includes(chat._id) && (
              <div className="absolute -bottom-1 -right-1 size-3.5 bg-obsidian-950 rounded-full flex items-center justify-center border-2 border-obsidian-900">
                <div className="size-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold truncate transition-colors ${
              selectedUser?._id === chat._id ? "text-white" : "text-zinc-400 group-hover:text-white"
            }`}>
              {chat.fullName}
            </h4>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mt-0.5">
              {onlineUsers.includes(chat._id) ? "Active Now" : "Recently Active"}
            </p>
          </div>

          {/* ACTIVE INDICATOR */}
          {selectedUser?._id === chat._id && (
            <motion.div
              layoutId="active-indicator"
              className="size-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.6)]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
export default ChatsList;
