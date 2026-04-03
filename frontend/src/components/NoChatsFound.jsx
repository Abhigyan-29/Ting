import { MessageCircleIcon, UsersIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-6 bg-white/5 rounded-3xl border border-dashed border-white/10"
    >
      <div className="size-16 bg-black rounded-2xl flex items-center justify-center shadow-inner border border-white/5">
        <MessageCircleIcon className="size-8 text-rose-500" />
      </div>
      <div>
        <h4 className="text-white font-bold text-lg mb-1 tracking-tight">No active threads</h4>
        <p className="text-zinc-600 text-sm max-w-[200px] mx-auto leading-relaxed">
          Your conversation list is empty. Start a new connection today.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "rgba(225, 29, 72, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab("contacts")}
        className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all duration-300"
      >
        <UsersIcon className="size-4" />
        Find Contacts
      </motion.button>
    </motion.div>
  );
}
export default NoChatsFound;
