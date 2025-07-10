import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-slate-900/50 border-t border-slate-700/50">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="text-xl font-bold text-white">NFT Gallery</span>
        </div>
        <p className="text-slate-400 mb-4">
          Discover, collect, and trade extraordinary NFTs
        </p>
        <div className="flex justify-center gap-6 text-slate-400">
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Help
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700/50 text-sm text-slate-500">
          © 2024 NFT Gallery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
