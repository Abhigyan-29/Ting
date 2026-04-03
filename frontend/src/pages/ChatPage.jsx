import { useChatStore } from "../store/useChatStore";
import { motion, AnimatePresence } from "framer-motion";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-6xl h-full max-h-[850px]"
    >
      <BorderAnimatedContainer>
        <div className="flex w-full h-full overflow-hidden">
          {/* LEFT SIDE - SIDEBAR */}
          <div className={`${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-80 flex-col border-r border-white/5 bg-obsidian-900/40 backdrop-blur-xl shrink-0`}>
            <ProfileHeader />
            <div className="px-4 py-2">
              <ActiveTabSwitch />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 space-y-2"
                >
                  {activeTab === "chats" ? <ChatsList /> : <ContactList />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE - CHAT AREA */}
          <div className={`${!selectedUser ? "hidden md:flex" : "flex"} flex-1 flex flex-col bg-obsidian-950/30 backdrop-blur-md relative overflow-hidden h-full`}>
            <AnimatePresence mode="wait">
              {selectedUser ? (
                <motion.div 
                  key={selectedUser?._id || "chat"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full overflow-hidden"
                >
                  <ChatContainer />
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full overflow-hidden"
                >
                  <NoConversationPlaceholder />
                </motion.div>
              )}
            </AnimatePresence>


            {/* DECORATIVE BACKGROUND FOR CHAT AREA */}
            <div className="absolute top-0 right-0 size-64 bg-rose-600/5 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 size-64 bg-rose-900/5 blur-[100px] -z-10" />
          </div>
        </div>
      </BorderAnimatedContainer>
    </motion.div>
  );
}
export default ChatPage;
