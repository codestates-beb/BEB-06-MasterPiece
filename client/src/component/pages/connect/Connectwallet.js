function Connectwallet() {
  return (
    <div className="connect">
      <div className="connect-title">
        Connect your wallet to start listing your{" "}
        <a style={{ color: "tomato", marginLeft: "10px" }}>NFTs</a>
        <img src="label.jpg" style={{ width: "30px", height: "30px" }} />
      </div>
      <button className="connect-btn border-gradient">connect wallet</button>
    </div>
  );
}

export default Connectwallet;
