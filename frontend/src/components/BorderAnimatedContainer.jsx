function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full bg-obsidian-900/50 backdrop-blur-3xl rounded-3xl border border-white/5 flex overflow-hidden shadow-2xl relative group">
      {/* PREMIUM GLOW ON HOVER */}
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl pointer-events-none" />
      <div className="absolute inset-0 border border-rose-500/0 group-hover:border-rose-500/20 transition-all duration-500 rounded-3xl pointer-events-none" />
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;
