import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="relative flex p-1 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
      {/* ANIMATED PILL */}
      <motion.div
        animate={{
          x: activeTab === "chats" ? "0%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-gradient-to-r from-rose-600 to-rose-700 rounded-xl shadow-lg shadow-rose-600/20"
      />

      <button
        onClick={() => setActiveTab("chats")}
        className={`relative z-10 flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
          activeTab === "chats" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`relative z-10 flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
          activeTab === "contacts" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
