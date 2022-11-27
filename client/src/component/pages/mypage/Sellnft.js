function Sellnft({ selectNft }) {
  console.log(selectNft); //선택된거 넘어옴
  return (
    <div>
      <h1 className="sell-title">Setting My NFT Price</h1>
      <img src={selectNft.image_url}></img>
      <h2>{selectNft.collection.name}</h2>
      <p>{selectNft.name}</p>
      <input type="text" /> ETH
      <button>sell</button>
    </div>
  );
}

export default Sellnft;
