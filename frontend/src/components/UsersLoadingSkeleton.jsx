import { motion } from "framer-motion";

function UsersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div 
          key={item} 
          className="bg-white/5 p-3 rounded-2xl border border-white/5 overflow-hidden relative"
        >
          <div className="flex items-center gap-4">
            {/* AVATAR SKELETON */}
            <div className="size-12 bg-white/10 rounded-xl relative overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            </div>
            
            {/* TEXT SKELETONS */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded-md w-3/4 relative overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              </div>
              <div className="h-3 bg-white/5 rounded-md w-1/2 relative overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;
