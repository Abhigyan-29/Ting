import { XIcon, ShieldCheckIcon, BanIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser, blockUser, unblockUser } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser?._id);
  const isBlocked = authUser?.blockedUsers?.includes(selectedUser?._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-white/5 border-b border-white/5 backdrop-blur-xl px-6 py-4 z-20">
      <div className="flex items-center space-x-4">
        {/* AVATAR WITH ONLINE INDICATOR */}
        <div className="relative group">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="size-12 rounded-2xl overflow-hidden border-2 border-rose-500/20 p-0.5 bg-gradient-to-tr from-rose-600/10 to-rose-400/10 shadow-lg shadow-rose-600/5 group-hover:border-rose-500/30 transition-colors duration-300"
          >
            <img 
              src={selectedUser?.profilePic || "/avatar.png"} 
              alt={selectedUser?.fullName || "User"} 
              className="size-full object-cover rounded-[10px]"
            />
          </motion.div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 size-4 bg-obsidian-950 rounded-full flex items-center justify-center border-2 border-obsidian-900">
              <div className="size-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-white font-bold text-lg tracking-tight">{selectedUser?.fullName || "User"}</h3>
            <ShieldCheckIcon className="size-4 text-rose-500" />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-[10px] font-bold uppercase tracking-widest ${isOnline ? "text-emerald-500" : "text-zinc-600"}`}
          >
            {isOnline ? "Active Now" : "Currently Offline"}
          </motion.p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: isBlocked ? "rgba(16, 185, 129, 0.1)" : "rgba(225, 29, 72, 0.1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => (isBlocked ? unblockUser(selectedUser?._id) : blockUser(selectedUser?._id))}
          className={`size-10 rounded-xl flex items-center justify-center transition-colors bg-white/5 border border-white/5 shadow-sm ${
            isBlocked ? "text-emerald-500 hover:text-emerald-400" : "text-zinc-500 hover:text-rose-500"
          }`}
          title={isBlocked ? "Unblock User" : "Block User"}
        >
          <BanIcon className="size-5" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(225, 29, 72, 0.1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedUser(null)}
          className="size-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-rose-500 transition-colors bg-white/5 border border-white/5 shadow-sm"
        >
          <XIcon className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}
export default ChatHeader;
