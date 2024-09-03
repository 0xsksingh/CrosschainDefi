import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
export default function ChainStats({ chains }) {

  const activeacc = useActiveAccount();


  return (
    <div>
      <h3 className="mb-3">Chain Stats</h3>
      <div className="flex flex-col gap-4">
        {chains.map((chain, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex flex-row gap-2">
                <Image src={chain.logo} alt={chain.name} className="mr-2 rounded-xl" width={24} height={24} />
                {chain.name}
              </CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p><strong>Balance:</strong> {parseInt(chain.balance) / 10 ** 18}</p>
              </div>
            </CardContent>
            {/* <div key={index} className="card shadow m-3">
              <div className="card-body">
                <div className="card-title flex items-center">
                  <div className="underline" style={{ backgroundColor: chain.color }}></div>
                  <img src={chain.logo} alt={chain.name} className="mr-2" width={20} height={20} />
                  <h5>{chain.name}</h5>
                </div>
                <p><strong>Balance:</strong> {parseInt(chain.balance) / 10 ** 18}</p>
              </div>
            </div> */}
          </Card>


        ))}
      </div>
    </div>
  );
}
