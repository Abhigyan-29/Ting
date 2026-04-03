import { MessageCircleIcon, HandIcon, CoffeeIcon, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useChatStore } from "../store/useChatStore";

const NoChatHistoryPlaceholder = ({ name }) => {
  const { sendMessage } = useChatStore();

  const quickActions = [
    { label: "Say Hello", icon: HandIcon, text: "Hey there! 👋" },
    { label: "How are you?", icon: CoffeeIcon, text: "How's it going? 😊" },
    { label: "Meet up soon?", icon: CalendarIcon, text: "We should catch up sometime soon! 📅" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="size-20 bg-gradient-to-tr from-rose-600/10 to-rose-400/5 rounded-3xl flex items-center justify-center mb-6 shadow-inner mx-auto">
          <MessageCircleIcon className="size-10 text-rose-500" />
        </div>
        
        <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
          Start a new chapter with <span className="text-rose-500">{name}</span>
        </h3>
        
        <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-medium">
          Whether it's a quick catch-up or a deep dive, every great conversation starts with a single message.
        </p>

        <div className="flex flex-col gap-3 w-full">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(225, 29, 72, 0.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => sendMessage({ text: action.text })}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold text-zinc-400 hover:text-rose-500 hover:border-rose-500/30 transition-all duration-300 text-left group"
            >
              <div className="size-8 rounded-xl bg-black flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
                <action.icon className="size-4" />
              </div>
              <span className="flex-1">{action.label}</span>
              <span className="text-[10px] text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                Send Now
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
