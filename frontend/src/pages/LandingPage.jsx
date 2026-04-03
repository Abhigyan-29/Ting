import { motion } from "framer-motion";
import { Link } from "react-router";
import { 
  MessageCircleIcon, 
  ZapIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  ArrowRightIcon, 
  GlobeIcon 
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex flex-col items-center">
      {/* HERO SECTION */}
      <div className="text-center mb-16 lg:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-bold uppercase tracking-widest mb-8"
        >
          <SparklesIcon className="size-4" />
          Introducing Ting 
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8"
        >
          Conversations that <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-600 to-rose-400">
            spark instantly.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Ting is the pulse of every connection. Experience lightning-fast, secure, and stunningly minimal messaging for the modern world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/signup"
            className="auth-btn px-10 py-4 flex items-center gap-2 group w-full sm:w-auto text-lg"
          >
            Start Your Journey
            <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="px-10 py-4 rounded-xl border border-white/10 hover:border-rose-500/40 hover:bg-rose-500/5 text-white font-bold transition-all duration-300 w-full sm:w-auto"
          >
            Welcome Back
          </Link>
        </motion.div>
      </div>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[
          {
            icon: <ZapIcon className="size-6 text-rose-500" />,
            title: "Instant Pulse",
            desc: "Zero latency. Messages delivered before you even finish your thought.",
          },
          {
            icon: <ShieldCheckIcon className="size-6 text-rose-500" />,
            title: "Quantum Secure",
            desc: "End-to-end encryption that keeps your private moments truly private.",
          },
          {
            icon: <GlobeIcon className="size-6 text-rose-500" />,
            title: "Truly Global",
            desc: "Connect across borders with seamless, high-fidelity real-time sync.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 + idx * 0.1 }}
            className="glass-card p-8 rounded-3xl group hover:border-rose-500/20 transition-all duration-500"
          >
            <div className="size-14 rounded-2xl bg-rose-500/10 border border-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-rose-500/5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* DECORATIVE LOGO BG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="fixed bottom-0 right-0 pointer-events-none -mr-20 -mb-20"
      >
        <MessageCircleIcon className="size-[600px] text-rose-500" />
      </motion.div>
    </div>
  );
};

export default LandingPage;
