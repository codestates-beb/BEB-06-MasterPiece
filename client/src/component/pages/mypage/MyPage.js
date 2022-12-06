import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contractStore, useStore } from "../../../store/store";
import MyNftList from "./MyNftList";
import MyFractionalNft from "./MyFractionalNft";
import EventMarket from "./EventMarket";
import Web3 from "web3";
import abi from "../../abi/erc1155optimizeABI";
import axios from "axios";

function Mypage() {
  const { smAddress } = contractStore();
  const [myNft, setMyNft] = useState([]);
  const [clickOnnft, setClickOnnft] = useState(true);
  const [clickOnpiece, setClickOnpiece] = useState(false);
  const [clickOnevent, setClickOnevent] = useState(false);
  const [token, setToken] = useState(0);
  const { account, myProfile } = useStore();
  const baycUri =
    "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1920";
  const cryptoUri =
    "https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000";
  const maycUri =
    "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&w=1920";
  const navigate = useNavigate();

  useEffect(() => {
    connectCheck();
    tokenBalance();
    getMyProfile();
  }, []);

  const handleMenu1 = () => {
    setClickOnnft(true);
    setClickOnpiece(false);
    setClickOnevent(false);
  };
  const handleMenu2 = () => {
    setClickOnpiece(true);
    setClickOnnft(false);
    setClickOnevent(false);
  };
  const handleMenu3 = () => {
    setClickOnpiece(false);
    setClickOnnft(false);
    setClickOnevent(true);
  };
  const tokenBalance = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, smAddress);
    await contract.methods
      .erc20balance(account)
      .call()
      .then((res) => {
        setToken(res);
      });
  };
  const connectCheck = () => {
    if (account == 0) {
      navigate("/connectwallet");
    }
  };

  const getMyProfile = () => {
    axios.get(`http://localhost:3001/mypage/${account}`).then((res) => {
      console.log(res.data);
      useStore.setState({ myProfile: res.data[0].profileUrl });
    });
  };

  return (
    <div className="mypage-box">
      {/* ///////////////////////// propfile box /////////////////////////*/}
      <div className="mypage-profile-box">
        <img src={myProfile} className="mypage-nft-pic" />{" "}
        {account == 0 ? (
          0
        ) : (
          <h3 className="mypage-account">
            {" "}
            {account.slice(0, 6)}...{account.slice(-3)}&nbsp;
            <img className="copy-btn" src="copy.jpg" />
          </h3>
        )}
        <div
          style={{ textAlign: "center", fontSize: "20px", marginTop: "22px" }}
        >
          <p></p>
          <div>
            {token} <span>POP</span>
          </div>
        </div>
        <div
          className={clickOnnft ? "click-menu" : "mypage-menu1"}
          onClick={handleMenu1}
        >
          MY NFT
        </div>
        <div
          className={clickOnpiece ? "click-menu" : "mypage-menu2"}
          onClick={handleMenu2}
        >
          MY PIECE OF NFT
        </div>
        <div
          className={clickOnevent ? "click-menu" : "mypage-menu3"}
          onClick={handleMenu3}
        >
          EVENT MARKET
        </div>
        {/* <div className="mypage-gettoken">Get token</div> */}
      </div>
      {/* ///////////////////////////// nft box /////////////////////////////*/}
      <div className="mypage-nft-box">
        {clickOnnft ? (
          <MyNftList />
        ) : clickOnpiece ? (
          <MyFractionalNft
            baycUri={baycUri}
            cryptoUri={cryptoUri}
            maycUri={maycUri}
          />
        ) : (
          <EventMarket />
        )}
      </div>
    </div>
  );
}

export default Mypage;
