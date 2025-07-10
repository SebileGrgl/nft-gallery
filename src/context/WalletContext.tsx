"use client";

import { WalletContextType } from "@/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { address, isConnected, chainId } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const [balance, setBalance] = useState<string | null>(null);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const handleConnect = async () => {
    try {
      connect({ connector: injected() });
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setBalance(null);
  };

  useEffect(() => {
    if (address && isConnected) {
      setBalance("1.234");
    }
  }, [address, isConnected]);

  useEffect(() => {
    console.log("Wagmi account info:", { address, isConnected, chainId });
  }, [address, isConnected, chainId]);

  const value: WalletContextType = {
    address: address || null,
    isConnected,
    isConnecting,
    connect: handleConnect,
    disconnect: handleDisconnect,
    shortAddress,
    balance,
    chainId: chainId || null,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
