import { useState } from "react";
import BuyNftList from "./BuyNftList";
import PieceNft from "./PieceNft";

function Market() {
  const [nftNum, setNftNum] = useState(0);

  const handleNftNum = (num) => {
    setNftNum(num);
  };
  return (
    <div className="nftlist">
      <h1>NFT Market</h1>
      <div className="nftlist-res">
        <div>
          <img src="clock.jpg" style={{ marginRight: "12px" }} />
        </div>
        <div style={{ marginTop: "5px" }}>Recently Added</div>
        <div className="nft-numbers">{nftNum}</div>
      </div>
      <BuyNftList handleNftNum={handleNftNum} />
    </div>
  );
}

export default Market;
