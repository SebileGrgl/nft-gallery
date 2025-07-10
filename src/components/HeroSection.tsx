import React from "react";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
      <div className="relative container mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold  mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Discover Rare NFTs
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Explore the most exclusive digital collectibles from top artists and
          creators worldwide.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
