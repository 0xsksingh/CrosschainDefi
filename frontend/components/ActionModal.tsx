import { useState } from "react";
import { ethers } from "ethers";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";

export default function ActionModal({ action, chains, updateStats, setIsModalOpen }) {
  const [amount, setAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState(null);

  const { mutate: sendTransaction } = useSendTransaction();

  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_KEY!
  });


  console.log(selectedChain)


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedChain || !amount) return;

    try {
      // Assuming the contract functions are similar to what you had in JS
      const weiAmount = ethers.parseEther(amount.toString());

      if (action === "Deposit") {

        const contract = getContract({
          client,
          chain: defineChain(selectedChain.chainID),
          address: selectedChain?.spokeAddress
        });

        const transaction = prepareContractCall({
          contract,
          method: "function deposit(uint256 amount)",
          params: [weiAmount]
        });

        await sendTransaction(transaction);

      } else if (action === "Withdraw") {

        const contract = getContract({
          client,
          chain: defineChain(selectedChain.chainID),
          address: selectedChain?.spokeAddress
        });

        const transaction = await prepareContractCall({
          contract,
          method: "function requestWithdraw(uint256 amount)",
          params: [weiAmount]
        });

        await sendTransaction(transaction);

      } else if (action === "Borrow") {

        const contract = getContract({
          client,
          chain: defineChain(selectedChain.chainID),
          address: selectedChain?.spokeAddress
        });

        const transaction = await prepareContractCall({
          contract,
          method: "function requestBorrow(uint256 amount)",
          params: [weiAmount]
        });

        await sendTransaction(transaction);

      } else if (action === "Repay") {

        const contract = getContract({
          client,
          chain: defineChain(selectedChain.chainID),
          address: selectedChain?.spokeAddress
        });

        const transaction = await prepareContractCall({
          contract,
          method: "function repayBorrow(uint256 amount)",
          params: [weiAmount]
        });

        await sendTransaction(transaction);
      }

      updateStats(weiAmount); // Update stats after the transaction
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
        <h2>{action}</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="chains-dropdown">Chain</label>
            <select
              className="form-select"
              id="chains-dropdown"
              value={selectedChain}
              onChange={(e) => setSelectedChain(chains[e.target.value])}
            >
              {chains.map((chain, index) => (
                <option key={index} value={index}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid mb-3">
            <button className="btn btn-primary" type="submit">Execute</button>
          </div>
        </form>
      </div>
    </div>
  );
}
