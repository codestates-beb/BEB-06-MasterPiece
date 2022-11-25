import { useState } from "react";
import BuyNftList from "./BuyNftList";
import PieceNft from "./PieceNft";

function Market() {
  const [nftType, setNftType] = useState("nft");

  const handleNormal = () => {
    setNftType("nft");
  };

  const handlePiece = () => {
    setNftType("PieceNft");
  };

  return (
    <div className="nftlist">
      <h1>NFT Market</h1>
      <div className="nftlist-menu">
        <div onClick={handleNormal}>NFTs</div>
        <div onClick={handlePiece}>Piece of NFTs</div>
      </div>
      <div className="nftlist-res">
        <div>
          <img src="clock.jpg" style={{ marginRight: "12px" }} />
        </div>
        <div style={{ marginTop: "5px" }}>Recently Added</div>
        <div className="nft-numbers">10,204 items</div>
      </div>

      {/* nft type에 따라 컴포넌트 다르게 */}
      {nftType === "nft" ? <BuyNftList /> : <PieceNft />}
    </div>
  );
}

export default Market;
