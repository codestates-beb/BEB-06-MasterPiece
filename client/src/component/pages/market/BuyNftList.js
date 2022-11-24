function BuyNftList() {
  return (
    <div className="nftlist">
      {/* <h1>Shop NFTs</h1> */}
      <div className="nftlist-menu">
        <div>NFTs</div>
        <div>Piece of NFTs</div>
      </div>
      <div className="nftlist-res">
        <div>
          <img src="clock.jpg" style={{ marginRight: "12px" }} />
        </div>
        <div style={{ marginTop: "5px" }}>Recently Added</div>
        <div className="nft-numbers">10,204 items</div>
      </div>
      <div className="container">
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
        <div className="nft"></div>
      </div>
    </div>
  );
}

export default BuyNftList;
