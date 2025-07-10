import { useWallet } from "@/context/WalletContext";
import {
  BookA,
  Home,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import ConnectWalletBtn from "./ConnectWalletBtn";

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { isConnected, shortAddress } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const navigationItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookA, label: "About", href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-white">NFT Gallery</h1>
                  <p className="text-xs text-slate-400">Web3 Collection</p>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search NFTs, collections..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <ConnectWalletBtn />

              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search NFTs, collections..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="mobile-menu fixed right-0 top-0 h-full w-80 bg-slate-900 border-l border-slate-700/50 shadow-xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isConnected && (
                <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {shortAddress?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Connected
                      </p>
                      <p className="text-xs text-slate-400">{shortAddress}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg"
                    onClick={toggleMenu}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </a>
                ))}
                <hr className="border-slate-700/50 my-4" />
                <a
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg"
                  onClick={toggleMenu}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
