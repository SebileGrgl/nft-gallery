"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "../config/wagmi";
import { WalletProvider } from "@/context/WalletContext";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "#8b5cf6",
                accentColorForeground: "white",
                borderRadius: "large",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <WalletProvider>{children}</WalletProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
