import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon, SparklesIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

function LoginPage() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-6xl h-full md:max-h-[750px] lg:max-h-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden backdrop-blur-md bg-white/5">
              <div className="w-full max-w-sm relative z-10">
                {/* LOGO & HEADING */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 shadow-xl shadow-rose-600/20 mb-6"
                  >
                    <MessageCircleIcon className="size-8 text-white" />
                  </motion.div>
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Welcome to <span className="text-rose-500">Ting</span></h2>
                  <p className="text-zinc-500 font-medium tracking-tight">The pulse of your digital world</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL INPUT */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <label className="auth-input-label">Email or Username</label>
                    <div className="relative group">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.identifier}
                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                        className="input"
                        placeholder="Email or Username"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* PASSWORD INPUT */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label className="auth-input-label">Password</label>
                    <div className="relative group">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* SUBMIT BUTTON */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <button className="auth-btn group overflow-hidden relative hover-scale" type="submit" disabled={isLoggingIn}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoggingIn ? (
                          <LoaderIcon className="size-5 animate-spin" />
                        ) : (
                          <>
                            Sign In
                            <SparklesIcon className="size-4 group-hover:rotate-12 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center space-y-4"
                >
                  <Link to="/forgot-password" size="sm" className="auth-link block text-xs opacity-70 hover:opacity-100 italic transition-opacity">
                    Forgot password?
                  </Link>

                  <div className="pt-2">
                    <p className="text-zinc-600 text-sm mb-2">New here?</p>
                    <Link to="/signup" className="auth-link group inline-flex items-center gap-1.5">
                      Create a premium account
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* DECORATIVE ELEMENTS */}
              <div className="absolute top-0 right-0 size-64 bg-rose-600/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 size-64 bg-rose-900/5 blur-[80px] translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* ART COLUMN - RIGHT SIDE */}
            <div className="hidden md:flex md:w-1/2 relative bg-obsidian-950/20 items-center justify-center p-8 overflow-hidden">
              <div className="relative z-10 text-center max-w-sm">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  <img
                    src="/auth-illustration.png"
                    alt="Premium communication"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(225,29,72,0.15)] hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-10 space-y-4"
                >
                  <h3 className="text-2xl font-bold text-white tracking-tight">The Future of Chat</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Experience lightning-fast messaging with end-to-end security and a stunning minimalist interface.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <span className="auth-badge">Secure</span>
                    <span className="auth-badge">E2E</span>
                    <span className="auth-badge">Fast</span>
                  </div>
                </motion.div>
              </div>

              {/* MESH BACKGROUND FOR ART SIDE */}
              <div className="absolute inset-0 z-0 bg-radial-gradient-rose opacity-40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[150%] bg-[url('/grid.svg')] bg-center opacity-10" />
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </motion.div>
  );
}
export default LoginPage;
