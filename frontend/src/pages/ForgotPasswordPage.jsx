import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MailIcon, LoaderIcon, ArrowLeftIcon, SparklesIcon, MessageCircleIcon, CheckCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success !== false) {
      setIsSubmitted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex items-center justify-center p-4 min-h-[calc(100vh-80px)]"
    >
      <div className="relative w-full max-w-xl">
        <BorderAnimatedContainer>
          <div className="w-full p-8 lg:p-12 relative overflow-hidden backdrop-blur-md bg-white/5">
            <div className="w-full max-w-sm mx-auto relative z-10">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-10">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 shadow-xl shadow-rose-600/20 mb-6"
                      >
                        <MessageCircleIcon className="size-8 text-white" />
                      </motion.div>
                      <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Forgot Password?</h2>
                      <p className="text-zinc-500 font-medium tracking-tight">Enter your email for a reset link</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <label className="auth-input-label">Email Address</label>
                        <div className="relative group">
                          <MailIcon className="auth-input-icon" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            placeholder="name@example.com"
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <button className="auth-btn group overflow-hidden relative hover-scale" type="submit" disabled={isLoggingIn}>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoggingIn ? (
                              <LoaderIcon className="size-5 animate-spin" />
                            ) : (
                              <>
                                Send Reset Link
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
                      transition={{ delay: 0.5 }}
                      className="mt-8 text-center"
                    >
                      <Link to="/login" className="auth-link group inline-flex items-center gap-1.5">
                        <ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to login
                      </Link>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center py-10"
                  >
                    <div className="inline-flex items-center justify-center size-20 rounded-full bg-emerald-500/10 mb-8 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                      <CheckCircleIcon className="size-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Check Your Inbox</h2>
                    <p className="text-zinc-500 font-medium leading-relaxed mb-10">
                      We've sent a password reset link to <br/>
                      <span className="text-rose-500 font-bold">{email}</span>.
                    </p>
                    
                    <Link to="/login" className="auth-btn block text-center">
                      Return to Sign In
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DECORATIVE ELEMENTS */}
            <div className="absolute top-0 right-0 size-64 bg-rose-600/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 size-64 bg-rose-900/5 blur-[80px] translate-y-1/2 -translate-x-1/2" />
          </div>
        </BorderAnimatedContainer>
      </div>
    </motion.div>
  );
}

export default ForgotPasswordPage;
