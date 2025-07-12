"use client";
import { useWallet } from "@/context/WalletContext";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Button from "./Button";

const ConnectWalletBtn: React.FC = () => {
  const { isConnected, disconnect, shortAddress } = useWallet();
  const { openConnectModal } = useConnectModal();

  return (
    <Button
      onClick={isConnected ? disconnect : openConnectModal}
      variant={isConnected ? "outline" : "primary"}
      size="sm"
      className="font-mono cursor-pointer"
    >
      {isConnected ? shortAddress || "Disconnect" : "Connect Wallet"}
    </Button>
  );
};

export default ConnectWalletBtn;
