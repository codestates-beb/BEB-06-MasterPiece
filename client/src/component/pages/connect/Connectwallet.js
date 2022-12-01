import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/store";
import Web3 from "web3";

function Connectwallet() {
  const { account } = useStore();
  const navigate = useNavigate();
  console.log(account);
  async function connect() {
    try {
      if (account == 0) {
        if (window.ethereum) {
          let web3 = new Web3(window.ethereum);
          await window.ethereum.send("eth_requestAccounts");
          let accounts = await web3.eth.getAccounts();
          useStore.setState({ account: accounts[0] });
          if (accounts[0] != 0) {
            alert("connect succeeded");
            navigate("/mypage");
          }
        }
      } else {
        alert("aleady connected");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="connect">
      <div className="connect-title">
        Connect your wallet to start listing your
        <a style={{ color: "tomato", marginLeft: "10px" }}>NFTs</a>
        <img src="label.jpg" style={{ width: "30px", height: "30px" }} />
      </div>
      <button className="connect-btn border-gradient" onClick={connect}>
        connect wallet
      </button>
      <div></div>
    </div>
  );
}

export default Connectwallet;
