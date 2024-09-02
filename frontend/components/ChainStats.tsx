export default function ChainStats({ chains }) {

  
    return (
      <div>
        <h3 className="mb-3">Chain Stats</h3>
        <div className="flex flex-wrap">
          { chains.map((chain, index) => (
            <div key={index} className="card shadow m-3">
              <div className="card-body">
                <div className="card-title flex items-center">
                  <div className="underline" style={{ backgroundColor: chain.color }}></div>
                  <img src={chain.logo} alt={chain.name} className="mr-2" />
                  <h5>{chain.name}</h5>
                </div>
                <p><strong>Balance:</strong> {parseInt(chain.balance) / 10 ** 18}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  