import { motion } from "framer-motion";

function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {[...Array(6)].map((_, index) => {
        const isStart = index % 2 === 0;
        return (
          <div
            key={index}
            className={`flex ${isStart ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`relative overflow-hidden h-12 rounded-2xl ${
                isStart 
                  ? "w-48 bg-white/10 border border-white/5 rounded-bl-sm" 
                  : "w-64 bg-royal-600/20 border border-royal-500/10 rounded-br-sm"
              }`}
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: index * 0.1 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-xl"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MessagesLoadingSkeleton;
