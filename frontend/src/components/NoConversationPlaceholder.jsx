import { MessageCircleIcon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 relative overflow-hidden">
      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-rose-600/5 blur-[100px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative"
      >
        <div className="size-24 bg-gradient-to-tr from-rose-600 to-rose-700 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-rose-600/20 relative z-10 mx-auto">
          <MessageCircleIcon className="size-10 text-white" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 size-8 bg-black rounded-xl flex items-center justify-center border border-white/5 shadow-lg"
          >
            <SparklesIcon className="size-4 text-rose-500" />
          </motion.div>
        </div>

        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-extrabold text-white mb-3 tracking-tight"
        >
          Your Workspace Awaits
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-zinc-500 max-w-sm mx-auto leading-relaxed font-medium"
        >
          Select a conversation from the sidebar to re-enter your world of secure and private communication.
        </motion.p>
      </motion.div>

      {/* FOOTER BADGE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
          <div className="size-1.5 bg-rose-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            End-to-End Encrypted
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default NoConversationPlaceholder;
