import React from "react";

const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-slate-400">Total NFTs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">2,500+</div>
            <div className="text-slate-400">Artists</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-slate-400">Collections</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">1,000+</div>
            <div className="text-slate-400">Owners</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
