"use client";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import LiquidityChart from "@/components/LiquidityChart";
import ChainStats from "@/components/ChainStats";
import ActionModal from "@/components/ActionModal";
import LiquidityChainChart from "@/components/LiquidityChainChart";

export default function Home() {
  const [deposited, setDeposited] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [chains, setChains] = useState([]);
  const [selectedChain, setSelectedChain] = useState(null);

  const HUB_ADDRESS = "0x553126B5d9535a30fA4639adA7ADBdfdDC746AFd";
  const HUB_TOKEN_ADDRESS = "0xDe918aEf7f38AA916625d90B3Ca60D5c20B19317";
  const HUB_CHAIN_ID = 11155111;
  const HUB_WORMHOLE_ID = 10002;
  
  const address = useActiveAccount();

  useEffect(() => {
    // Load chains data here
    const loadChains = async () => {

      const spokechainsData = [
        {
          name: "Sepolia",
          logo: "img/sepolia.svg",
          color: "rgb(50, 60, 150)",
          chainID: 11155111,
          rpc: "https://eth-sepolia.public.blastapi.io",
          wormholeID: 10002,
          spokeAddress: "0x553126B5d9535a30fA4639adA7ADBdfdDC746AFd",
          tokenAddress: "0xDe918aEf7f38AA916625d90B3Ca60D5c20B19317",
          symbol: "ETH",
          data: [],
        }, {
          name: "Base Sepolia",
          logo: "img/arbitrum.svg",
          color: "rgb(50, 60, 150)",
          chainID: 84532,
          rpc: "https://sepolia.base.org",
          wormholeID: 10004,
          spokeAddress: "0x553126B5d9535a30fA4639adA7ADBdfdDC746AFd",
          tokenAddress: "0x6E411aAE23ba8eB4EeD82e274CC32887511eCF6E",
          symbol: "ETH",
          data: [],
        }, {
          name: "OP Sepolia",
          logo: "img/opsepolia.svg",
          color: "rgb(200, 50, 200)",
          chainID: 11155420,
          rpc: "https://sepolia.optimism.io",
          wormholeID: 10005,
          spokeAddress: "0xa93208bB5798bd2B7A6d56DE7F346D332088528c",
          tokenAddress: "0x9df6785ec662ff2426F1f064D4c72B82aFEd0A60",
          symbol: "ETH",
          data: [],
        }]

      setChains(spokechainsData);
    };

    loadChains();
  }, []);

  const handleAction = (actionType) => {
    setAction(actionType);
    setIsModalOpen(true);
  };

  const updateStats = (newDeposited, newBorrowed) => {
    setDeposited(newDeposited);
    setBorrowed(newBorrowed);
  };

  console.log("Chains >>", chains);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MultiChainDefi</h1>
      <p className="mb-4">
        Multichaindefi innovates DeFi by offering a multi-chain lending and borrowing protocol...
      </p>
      <div className="flex justify-between mb-4">
        <div>
          <button onClick={() => handleAction("Deposit")} className="btn btn-secondary mr-3">Deposit</button>
          <button onClick={() => handleAction("Withdraw")} className="btn btn-secondary mr-3">Withdraw</button>
          <button onClick={() => handleAction("Borrow")} className="btn btn-secondary mr-3">Borrow</button>
          <button onClick={() => handleAction("Repay")} className="btn btn-secondary mr-3">Repay</button>
        </div>
        <div className="flex">
          <p className="mr-3">Deposited: <span>{deposited}</span></p>
          <p>Borrowed: <span>{borrowed}</span></p>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3">
          <LiquidityChainChart chains={chains} />
          {/* <LiquidityChart chains={chains} /> */}
        </div>
        <div className="w-1/3">
          {/* <ChainStats chains={chains} /> */}
        </div>
      </div>

      {isModalOpen && (
        <ActionModal
          action={action}
          chains={chains}
          updateStats={updateStats}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
