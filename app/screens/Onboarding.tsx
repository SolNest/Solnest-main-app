// app/screens/Onboarding.tsx

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/connect-wallet");
  };

  return (
    <div className="h-screen flex flex-col justify-between items-center px-6 py-10 bg-gradient-to-b bg-g  from-[#ebe9f3] to-[#f3f4f6]">
      <div className="mt-10 flex flex-col items-center border border-red-200 pb-6">
        <Image
          src="/onboarding-coin.png"
          alt="Onboarding"
          width={250}
          height={300}
          className="absolut top-0 left-4"
        />
      </div>

      <div className="border border-red-200">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Start Saving in Stablecoins, Earn While You Sleep
        </h1>
        <p className="text-2xl text-center text-gray-600 mt-2">
          Secure, stable and accessible savings that grow daily, no stress
        </p>
      </div>

      <button
        onClick={handleGetStarted}
        className="w-full py-4 bg-gradient-to-t from-[#5D3FD3] to-[#0A1F44] text-white rounded-lg shadow-md text-xl font-bold"
      >
        Get Started
      </button>
    </div>
  );
}
