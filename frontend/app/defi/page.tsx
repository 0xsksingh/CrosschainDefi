import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Chart from 'chart.js/auto';

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function LendingBorrowingPage() {
  const [account, setAccount] = useState('');
  const [collateral, setCollateral] = useState('');
  const [borrowedAmount, setBorrowedAmount] = useState('');
  const [healthFactor, setHealthFactor] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => setAccount(accounts[0]));
    }

    // Initialize Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
      },
    });

    return () => chart.destroy(); // Cleanup on unmount
  }, [chartData]);

  const handleBorrow = () => {
    // Handle borrow logic
  };

  const handleRepay = () => {
    // Handle repay logic
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Lending & Borrowing Dashboard</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <h3 className="text-md font-medium">Account Information</h3>
              <p className="text-gray-600">Address: {account}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-md font-medium">Collateral</h3>
              <Input
                value={collateral}
                onChange={(e) => setCollateral(e.target.value)}
                placeholder="Enter collateral amount"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-medium">Borrowed Amount</h3>
            <Input
              value={borrowedAmount}
              onChange={(e) => setBorrowedAmount(e.target.value)}
              placeholder="Enter borrowed amount"
            />
          </div>

          <div className="mt-4">
            <h3 className="text-md font-medium">Health Factor</h3>
            <Input
              value={healthFactor}
              onChange={(e) => setHealthFactor(e.target.value)}
              placeholder="Enter health factor"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-md font-medium">Portfolio Chart</h3>
            <canvas id="myChart" className="w-full h-64"></canvas>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button onClick={handleBorrow}>Borrow</Button>
          <Button onClick={handleRepay}>Repay</Button>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <h3 className="text-md font-medium">Loan History</h3>
        <Table className="w-full mt-4">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Collateral</TableCell>
              <TableCell>Borrowed</TableCell>
              <TableCell>Health Factor</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Replace with dynamic data */}
            <TableRow>
              <TableCell>01/01/2024</TableCell>
              <TableCell>1 ETH</TableCell>
              <TableCell>1000 USDT</TableCell>
              <TableCell>2.5</TableCell>
              <TableCell>Borrow</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
