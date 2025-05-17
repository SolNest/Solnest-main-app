// app/connect-wallet/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

import Image from "next/image";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const router = useRouter();

  const connectWallet = async () => {
    console.log("Connect button clicked");
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        setConnected(true);

        // Delay to simulate "Wallet Connected Successfully" popup
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between items-center px-6 py-10 bg-gradient-to-b bg-g  from-[#ebe9f3] to-[#f3f4f6]">
      <div className="mt-10 flex flex-col items-center border border-red-200 pb-6">
        <Image
          src="/Connect-wallet image.png"
          alt="Onboarding"
          width={250}
          height={300}
          className="absolut top-0 left-4"
        />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Let’s Get You Started
      </h2>
      <p className="text-2xl text-center text-gray-600 mt-2">
        Secure, stable and accessible savings that grow daily, no stress
      </p>

      <button
        onClick={connectWallet}
        className="w-full py-4 bg-gradient-to-t from-[#5D3FD3] to-[#0A1F44] text-white rounded-lg shadow-md text-xl font-bold"
      >
        {walletAddress ? "Wallet Connected" : "Connect to Wallet"}
      </button>

      {walletAddress && (
        <div className="mt-4 text-green-600 font-medium">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          <div className="mt-2 text-sm text-purple-600">
            Wallet Connected Successfully
          </div>
        </div>
      )}
    </div>
  );
}
