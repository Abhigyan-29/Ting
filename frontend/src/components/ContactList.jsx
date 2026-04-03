import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, selectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-3">
      {allContacts.map((contact, index) => (
        <motion.div
          key={contact._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={`group flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent ${
            selectedUser?._id === contact._id
              ? "bg-royal-600/20 border-royal-500/30 shadow-lg shadow-royal-600/5"
              : "hover:bg-white/5 hover:border-white/5"
          }`}
          onClick={() => setSelectedUser(contact)}
        >
          {/* AVATAR */}
          <div className="relative">
            <div className="size-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-royal-500/50 transition-colors">
              <img
                src={contact.profilePic || "/avatar.png"}
                alt={contact.fullName}
                className="size-full object-cover"
              />
            </div>
            {onlineUsers.includes(contact._id) && (
              <div className="absolute -bottom-1 -right-1 size-3.5 bg-obsidian-950 rounded-full flex items-center justify-center border-2 border-obsidian-900">
                <div className="size-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold truncate transition-colors ${
              selectedUser?._id === contact._id ? "text-white" : "text-slate-300 group-hover:text-white"
            }`}>
              {contact.fullName}
            </h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
              Available to Chat
            </p>
          </div>

          {/* INDICATOR */}
          {selectedUser?._id === contact._id && (
            <motion.div
              layoutId="active-indicator"
              className="size-1.5 rounded-full bg-royal-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
export default ContactList;
