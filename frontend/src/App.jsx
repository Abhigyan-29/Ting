import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { motion } from "framer-motion";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="h-[100dvh] bg-obsidian-950 relative flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* MODERN BACKGROUND DECORATORS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-radial-gradient-dark" />

        {/* FLOATING BLOBS */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-10%] left-[-10%] size-[500px] bg-rose-600/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[-10%] right-[-10%] size-[600px] bg-rose-900/10 blur-[130px] rounded-full"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-rose-500/5 blur-[150px] rounded-full"
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center overflow-y-auto custom-scrollbar">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <LandingPage />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
          <Route path="/forgot-password" element={!authUser ? <ForgotPasswordPage /> : <Navigate to={"/"} />} />
          <Route path="/reset-password" element={!authUser ? <ResetPasswordPage /> : <Navigate to={"/"} />} />
        </Routes>
      </div>


      <Toaster
        toastOptions={{
          className: "glass-card text-white border-rose-500/20",
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(16px)",
            color: "#fff",
            border: "1px solid rgba(225, 29, 72, 0.1)",
          },
        }}
      />
    </div>
  );
}
export default App;
