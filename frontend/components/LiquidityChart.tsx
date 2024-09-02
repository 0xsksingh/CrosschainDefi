import { Line } from 'react-chartjs-2';

export default function LiquidityChart({ chains }) {
  const data = {
    labels: Array.from({ length: 1000 }, (_, i) => i),
    datasets: chains.map(chain => ({
      label: chain.name,
      data: chain.data || [],
      borderColor: chain.color,
      tension: 0.2,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
}
