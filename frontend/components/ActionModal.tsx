import { useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export default function ActionModal({ action, chains, updateStats, setIsModalOpen }) {
  const [amount, setAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState(null);
  const { contract } = useContract(selectedChain?.cAddr);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedChain || !amount) return;

    try {
      // Assuming the contract functions are similar to what you had in JS
      const weiAmount = ethers.utils.parseEther(amount.toString());

      if (action === "Deposit") {
        await contract.deposit(weiAmount);
      } else if (action === "Withdraw") {
        await contract.withdraw(weiAmount);
      } else if (action === "Borrow") {
        await contract.borrow(weiAmount);
      } else if (action === "Repay") {
        await contract.repay(weiAmount);
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
        <form onSubmit={handleSubmit}>
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
