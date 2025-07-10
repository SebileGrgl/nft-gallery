import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "nft-gallery",
  projectId: "61b300ca49d437366caff2fd3d46f73c",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

export const supportedChains = [mainnet, polygon, optimism, arbitrum, base];
