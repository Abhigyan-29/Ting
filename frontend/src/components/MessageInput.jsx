import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon, PlusIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const isBlocked = authUser?.blockedUsers?.includes(selectedUser?._id);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 bg-white/5 border-t border-white/5 backdrop-blur-xl z-20">
      <AnimatePresence>
        {imagePreview && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="max-w-4xl mx-auto mb-4 flex items-center"
          >
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
              className="size-24 object-cover rounded-2xl border-2 border-rose-500/20 shadow-2xl shadow-rose-600/10"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 size-7 rounded-full bg-obsidian-950 border border-white/10 flex items-center justify-center text-white hover:bg-rose-500 transition-colors shadow-lg"
                type="button"
              >
                <XIcon className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-3">
        {/* ATTACH BUTTON */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isBlocked}
            className={`size-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/5 shadow-sm ${
              isBlocked ? "opacity-30 cursor-not-allowed bg-white/5 text-zinc-700" :
              imagePreview 
                ? "bg-rose-600 text-white border-rose-400/50 shadow-rose-600/20" 
                : "bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10"
            }`}
          >
            <PlusIcon className={`size-6 transition-transform duration-300 ${imagePreview ? "rotate-45" : ""}`} />
          </motion.button>
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* INPUT FIELD */}
        <div className="flex-1 relative group">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              if (isBlocked) return;
              setText(e.target.value);
              isSoundEnabled && playRandomKeyStrokeSound();
            }}
            readOnly={isBlocked}
            className={`w-full bg-black border border-white/5 rounded-2xl py-3.5 px-5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/30 transition-all duration-300 backdrop-blur-md ${
              isBlocked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder={isBlocked ? "Unblock to send messages" : "Write a message..."}
          />
        </div>

        {/* SEND BUTTON */}
        <motion.button
          whileHover={text.trim() || imagePreview ? { scale: 1.05, y: -2 } : {}}
          whileTap={text.trim() || imagePreview ? { scale: 0.95 } : {}}
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`size-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
            text.trim() || imagePreview
              ? "bg-gradient-to-tr from-rose-600 to-rose-700 text-white shadow-rose-600/20"
              : "bg-white/5 text-zinc-700 cursor-not-allowed border border-white/5"
          }`}
        >
          <SendIcon className="size-5 ml-0.5" />
        </motion.button>
      </form>
    </div>
  );
}
export default MessageInput;
