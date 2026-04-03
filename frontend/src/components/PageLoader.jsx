import { SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-obsidian-950 font-sans relative overflow-hidden">
      {/* BACKGROUND DECORATORS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-royal-600/5 blur-[150px] -z-10" />

      <div className="relative">
        {/* ANIMATED OUTER RING */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="size-24 rounded-[2rem] border-2 border-dashed border-royal-500/30"
        />
        
        {/* CENTER ICON */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="size-12 bg-gradient-to-tr from-royal-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-royal-600/20"
          >
            <SparklesIcon className="size-6 text-white" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-royal-400 font-bold uppercase tracking-[0.3em] text-[10px]">
          Initializing Workspace
        </p>
        <div className="mt-3 flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="size-1 bg-royal-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
export default PageLoader;
