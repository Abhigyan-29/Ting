import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, LoaderIcon, CheckCircleIcon, SparklesIcon, MessageCircleIcon } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword, isLoggingIn } = useAuthStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (!token) {
      return toast.error("Invalid reset link");
    }

    const success = await resetPassword(token, password);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                      <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Set New Password</h2>
                      <p className="text-zinc-500 font-medium tracking-tight">Choose a strong, unique password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="auth-input-label">New Password</label>
                        <div className="relative group">
                          <LockIcon className="auth-input-icon" />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            placeholder="••••••••"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="auth-input-label">Confirm Password</label>
                        <div className="relative group">
                          <LockIcon className="auth-input-icon" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                            placeholder="••••••••"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>

                      <button className="auth-btn group overflow-hidden relative hover-scale" type="submit" disabled={isLoggingIn}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isLoggingIn ? (
                            <LoaderIcon className="size-5 animate-spin" />
                          ) : (
                            <>
                              Reset Password
                              <SparklesIcon className="size-4 group-hover:rotate-12 transition-transform" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="inline-flex items-center justify-center size-20 rounded-full bg-emerald-500/10 mb-8 border border-emerald-500/20">
                      <CheckCircleIcon className="size-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Security Updated</h2>
                    <p className="text-zinc-500 font-medium leading-relaxed mb-6">
                      Your password has been reset successfully. <br/>
                      Redirecting you to sign in...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute top-0 right-0 size-64 bg-rose-600/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 size-64 bg-rose-900/5 blur-[80px] translate-y-1/2 -translate-x-1/2" />
          </div>
        </BorderAnimatedContainer>
      </div>
    </motion.div>
  );
}

export default ResetPasswordPage;
