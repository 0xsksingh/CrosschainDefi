"use client";
import { useState, useEffect, useRef } from "react";
import { useActiveAccount } from "thirdweb/react";
import LiquidityChart from "@/components/LiquidityChart";
import ChainStats from "@/components/ChainStats";
import ActionModal from "@/components/ActionModal";
import { createThirdwebClient, defineChain, getContract, readContract } from "thirdweb";

export default function Home() {
  const [deposited, setDeposited] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [chains, setChains] = useState([]);

  const chainsRef = useRef([]);
  const address = useActiveAccount();

  useEffect(() => {
    if (address?.address) {
      updateStats();
    }
  }, [address]);

  useEffect(() => {
    const loadChains = async () => {
      const spokechainsData = [
        {
          name: "Arbitrium Sepolia",
          logo: "/arbitrumsepolia.webp",
          color: "rgb(50, 60, 150)",
          chainID: 421614,
          rpc: "https://arbitrum-sepolia.blockpi.network/v1/rpc/",
          wormholeID: 10003,
          spokeAddress: "0xa93208bB5798bd2B7A6d56DE7F346D332088528c",
          tokenAddress: "0x9df6785ec662ff2426F1f064D4c72B82aFEd0A60",
          symbol: "ETH",
          balance: "0",
          data: [],
        },
        {
          name: "Base Sepolia",
          logo: "/baseSepolia.webp",
          color: "rgb(50, 60, 150)",
          chainID: 84532,
          rpc: "https://sepolia.base.org",
          wormholeID: 10004,
          spokeAddress: "0x553126B5d9535a30fA4639adA7ADBdfdDC746AFd",
          tokenAddress: "0x6E411aAE23ba8eB4EeD82e274CC32887511eCF6E",
          symbol: "ETH",
          balance: "0",
          data: [],
        },
        {
          name: "OP Sepolia",
          logo: "/optimismSepolia.webp",
          color: "rgb(200, 50, 200)",
          chainID: 11155420,
          rpc: "https://sepolia.optimism.io",
          wormholeID: 10005,
          spokeAddress: "0xa93208bB5798bd2B7A6d56DE7F346D332088528c",
          tokenAddress: "0x9df6785ec662ff2426F1f064D4c72B82aFEd0A60",
          symbol: "ETH",
          balance: "0",
          data: [],
        },
      ];

      chainsRef.current = spokechainsData;
      setChains(spokechainsData);
    };

    loadChains();
  }, []);

  useEffect(() => {
    const fetchChainBalances = async () => {
      const updatedChains = [...chainsRef.current];

      for (let i = 0; i < updatedChains.length; i++) {
        const chain = updatedChains[i];
        const client = createThirdwebClient({
          clientId: process.env.NEXT_PUBLIC_THIRDWEB_KEY!,
        });

        const contract = getContract({
          client,
          chain: defineChain(chain.chainID),
          address: chain.tokenAddress,
        });

        const balance = await readContract({
          contract,
          method: "function balanceOf(address) view returns (uint256)",
          params: [address?.address!],
        });

        console.log(balance, "balance");

        const weiBalance = parseInt(balance.toString()) / 10 ** 18;
        updatedChains[i].balance = weiBalance;
      }

      chainsRef.current = updatedChains;
      setChains(updatedChains);
    };

    if (chains.length > 0) {
      fetchChainBalances();
    }
  }, [address]);

  const handleAction = (actionType) => {
    setAction(actionType);
    setIsModalOpen(true);
  };

  const updateStats = async () => {
    const client = createThirdwebClient({
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_KEY!,
    });

    const contract = getContract({
      client,
      chain: defineChain(11155111),
      address: "0x76414c98ee9AD3F776054f16A351831b71870Ff3",
    });

    const borrowsdata = await readContract({
      contract,
      method: "function borrows(address) view returns (uint256)",
      params: [address?.address!],
    });

    const depositdata = await readContract({
      contract,
      method: "function deposits(address) view returns (uint256)",
      params: [address?.address!],
    });

    setDeposited(Number(depositdata) / 10 ** 18);
    setBorrowed(Number(borrowsdata) / 10 ** 18);
  };

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
          <LiquidityChart chains={chains} />
        </div>
        <div className="w-1/3">
          <ChainStats chains={chains} />
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
