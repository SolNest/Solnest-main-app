// app/Dashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Connection, PublicKey } from "@solana/web3.js";
import { BsBarChartLine, BsArrowRepeat } from "react-icons/bs";
import { TbCreditCardRefund, TbCreditCardPay } from "react-icons/tb";

export default function Dashboard() {
  const [address, setAddress] = useState<string | null>(null);
  const [balances, setBalances] = useState({
    sepolia: "0",
    base: "0",
    solana: "0",
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(async (accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);

            try {
              // Sepolia
              const sepoliaProvider = new ethers.JsonRpcProvider(
                "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"
              );
              const sepoliaBalance = await sepoliaProvider.getBalance(
                accounts[0]
              );

              // Base Goerli
              const baseProvider = new ethers.JsonRpcProvider(
                "https://base-goerli.public.blastapi.io"
              );
              const baseBalance = await baseProvider.getBalance(accounts[0]);

              // Solana (Devnet)
              const connection = new Connection(
                "https://api.devnet.solana.com"
              );
              let solanaBal = 0;
              try {
                const publicKey = new PublicKey(accounts[0]);
                const solBalanceLamports = await connection.getBalance(
                  publicKey
                );
                solanaBal = solBalanceLamports / 1e9;
              } catch (e) {
                solanaBal = 0; // not a valid sol address
              }

              setBalances({
                sepolia: ethers.formatEther(sepoliaBalance),
                base: ethers.formatEther(baseBalance),
                solana: solanaBal.toFixed(4),
              });
            } catch (err) {
              console.error("Error fetching balances:", err);
            }
          }
        });
    }
  }, []);

  return (
    <div className="p-6 flex flex-col gap-3 items-center text-gray-800 bg-white min-h-screen bg-gradient-to-b from-[#ebe9f3] to-[#f3f4f6]">
      <div className="w-full flex items-center justify-between h-11 border border-green-600">
        <div className="borde border-red-600 items-center justify-center flex rounded-full w-11 h-11">
          <img
            src="/pfp icon.png"
            alt="Onboarding"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        <div className="border border-red-600 items-center justify-center flex gap-2 rounded-ful w-20 h-11 ">
          <img
            src="/scan_svgrepo.com.png"
            alt="Onboarding"
            width={30}
            height={30}
            className="rounded-full"
          />
          <img
            src="/bell-bing_svgrepo.com.png"
            alt="Onboarding"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="w-full h-52 p-5 items-center gap-4 flex flex-col bg-[#5D3FD3] rounded-xl border">
        <h1 className="text-white ">Total Balance</h1>
        <h1 className="text-white text-3xl font-bold">$1210.00</h1>
        <div className="w-full h-20 flex gap-2 items-center justify-between borde">
          <div className="w-20 h-20 items-center justify-center flex flex-col bg-white text-[#5D3FD3] rounded-xl borde">
            <BsBarChartLine size={35} />
            <h1>Save</h1>
          </div>
          <div className="w-20 h-20 items-center justify-center flex flex-col bg-white text-[#5D3FD3] rounded-xl borde">
            <TbCreditCardRefund size={35} />
            <h1>Deposit</h1>
          </div>
          <div className="w-20 h-20 items-center justify-center flex flex-col bg-white text-[#5D3FD3] rounded-xl borde">
            <TbCreditCardPay size={35} />
            <h1>Withdraw</h1>
          </div>
          <div className="w-20 h-20 items-center justify-center flex flex-col bg-white text-[#5D3FD3] rounded-xl borde">
            <BsArrowRepeat size={35} />
            <h1>Convert</h1>
          </div>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-2">Chart Will Be Here</h1>
      <div className="w-full h-fit p-2 items-center gap-4 flex flex-col  border">
        <div className="flex justify-between w-full">
          <h1>Recent Transctions</h1>
          <h1>See All</h1>
        </div>
      </div>

      {!address ? (
        <p>Please connect your wallet.</p>
      ) : (
        <div className="space-y-3">
          <p>
            <strong>Address:</strong> {address}
          </p>
          <div className="bg-purple-50 p-4 rounded shadow">
            <p>
              <strong>Sepolia ETH:</strong> {balances.sepolia} ETH
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded shadow">
            <p>
              <strong>Base ETH:</strong> {balances.base} ETH
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded shadow">
            <p>
              <strong>Solana:</strong> {balances.solana} SOL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
