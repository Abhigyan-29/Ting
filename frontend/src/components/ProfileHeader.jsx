import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, CameraIcon, ShieldCheckIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* AVATAR WITH PREMIUM RING */}
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="size-14 rounded-2xl overflow-hidden relative border-2 border-rose-500/20 p-0.5 bg-gradient-to-tr from-rose-600/10 to-rose-400/10 shadow-lg shadow-rose-600/5"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User profile"
                className="size-full object-cover rounded-[14px]"
              />
              <div className="absolute inset-0 bg-obsidian-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px] cursor-pointer">
                <CameraIcon className="size-5 text-white" />
              </div>
            </motion.div>
            
            {/* ONLINE BADGE */}
            <div className="absolute -bottom-1 -right-1 size-4 bg-obsidian-950 rounded-full flex items-center justify-center border-2 border-obsidian-900">
              <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USER INFO */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="text-white font-bold text-lg tracking-tight truncate max-w-[140px]">
                {authUser.fullName}
              </h3>
              <ShieldCheckIcon className="size-4 text-rose-500 shrink-0" />
            </div>
            <div className="flex items-center gap-1 text-zinc-500 mb-1">
              <span className="text-[11px] font-medium opacity-70">@{authUser.username}</span>
            </div>
            <p className="text-rose-500/60 text-[10px] font-bold uppercase tracking-widest">
              Verified Member
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {/* SOUND TOGGLE */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.9 }}
            className="size-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-rose-500 transition-colors bg-white/5 border border-white/5 shadow-sm"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
          >
            {isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />}
          </motion.button>

          {/* LOGOUT */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(225, 29, 72, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            className="size-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-rose-500 transition-colors bg-white/5 border border-white/5 shadow-sm"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
