const LoadingCard = () => (
  <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl animate-pulse overflow-hidden">
    <div className="aspect-square bg-slate-700/40" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-slate-700/40 rounded w-2/3" />
      <div className="h-3 bg-slate-700/40 rounded w-1/3" />
      <div className="h-3 bg-slate-700/40 rounded w-full" />
      <div className="h-3 bg-slate-700/40 rounded w-5/6" />
    </div>
  </div>
);

export default LoadingCard;
