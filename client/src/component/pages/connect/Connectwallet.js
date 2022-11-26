import { useNavigate } from "react-router-dom";
import Web3 from "web3";

function Connectwallet() {
  const navigate = useNavigate();
  async function connect() {
    try {
      if (window.ethereum) {
        let web3 = new Web3(window.ethereum);
        await window.ethereum.send('eth_requestAccounts')
        let accounts = await web3.eth.getAccounts();
        console.log(accounts[0])
        if (accounts[0] != 0) {
          alert('login succeeded')
          navigate('/')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="connect">
      <div className="connect-title">
        Connect your wallet to start listing your
        <a style={{ color: "tomato", marginLeft: "10px" }}>NFTs</a>
        <img src="label.jpg" style={{ width: "30px", height: "30px" }} />
      </div>
      <button className="connect-btn border-gradient" onClick={connect}>connect wallet</button>
      <div></div>
    </div>
  );
}

export default Connectwallet;
