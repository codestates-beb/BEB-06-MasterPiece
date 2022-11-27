import { useState } from "react";

const MyFractionalNft = () => {
  const [pieceNft, setPieceNft] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  return (
    <div className="fractionalnft-box">
      {pieceNft.map((a) => {
        return (
          <div className="frac-nft">
            <img className="frac-pic" src="gallery1.jpg" />
            <div className="frac-des">
              <div>Bored Ape Yacht Club</div>
              <div>#1055</div>
              <div style={{ color: "tomato" }}>
                0.013 ETH <div className="sell-btn">sell</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyFractionalNft;
