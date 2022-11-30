import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
// import { ABI, ADDRESS } from "./config.js";
import About from "../main/About";
import useStore from "../../../store/store";
import abi from "../../abi/erc1155optimizeABI";
import tx from "ethers";

function Mint() {
  const smAddress = "0xe1A6B8329C6180f28d3c56E2CF4a1b453E43Bb8B";
  const { account } = useStore();
  const [provider, setProvider] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("Dec 07, 2022 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  // const getTotal = async () => {
  //     let web3 = new Web3(window.ethereum);
  //     let contract = await new web3.eth.Contract(ABI, ADDRESS);
  //     let total = await c  ontract.methods.totalSupply().call();
  //     setTotalmint(total);
  //   };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  //web3에서 제공하는 provider 쓸 수 있게 provider에 넣어두기
  const getProvider = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    return provider;
  };

  //   const getMintBlock = async () => {
  //     let web3 = new Web3(window.ethereum);
  //     let contract = await new web3.eth.Contract(ABI, ADDRESS);
  //     await contract.methods
  //       .getStartMintBlock()
  //       .call()
  //       .then((result) => {
  //         setstartBlock(result);
  //       });
  //   };

  async function publicMint() {
    if (account == 0) {
      alert("Error: 지갑을 연결해주세요");
      return;
    }

    // let web3 = new Web3(window.ethereum);
    // let contract = await new web3.eth.Contract(ABI, ADDRESS);
    // let mintRate = Number(await contract.methods.cost().call());
    // let totalAmount = BigNumber(amount * mintRate);
    if (amount <= 0 || amount > 3) {
      alert("3개까지만 욕심쟁이야");
      return;
    }
    // if (nowblock <= startBlock) {
    //   alert("시간이 안됐다");
    //   return;
    // }
    // try {
    //   const result = contract.methods.mint(account, amount).send({
    //     from: account,
    //     value: String(totalAmount),
    //   });

    //   if (result != null) {
    //     console.log(result);
    //     alert("민팅에 성공하였습니다");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert("민팅에 실패하였습니다.");
    // }
  }

  const minting = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, smAddress);
    const soulcheck = await contract.methods.soulBalanceOf(2, account).call();

    if (soulcheck == 0) {
      let params = [
        {
          from: account,
          to: "0xEcd5c913FC8B656dbfe0f2d902E1b0902de025aA",
          gas: Number(21000).toString(16),
          gasPrice: Number(2500000).toString(16),
          value: Number(1000000000000000).toString(16),
        },
      ];
      await window.ethereum
        .request({ method: "eth_sendTransaction", params })
        .then((res) => {
          console.log(res);
        });

      const privateKey =
        "299a2a3f9ce26ada82bb0a548c3f88a638125e010be4c9a458485eb485487e98";

      const host = web3.eth.accounts.privateKeyToAccount(privateKey).address;

      const transaction = contract.methods.souldrop(2, account, "");
      const options = {
        from: account,
        to: smAddress,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({ from: host }),
      };
      const signed = await web3.eth.accounts.signTransaction(
        options,
        privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signed.rawTransaction
      );
      return console.log(receipt);
    } else {
      alert("already minted");
    }

    // const Minting = await contract.methods.
  };

  // const handleAmount = (e) => {
  //   setAmount(e.target.value);
  // };

  return (
    <div>
      <div className="mint-box">
        <section>
          <h1 className="mint-title">
            <div>
              <img src="Puzzle.jpg" />
            </div>{" "}
            &nbsp; Crypto Punk #1123
          </h1>
          <div className="verify-badge">
            <div className="badge">1 piece</div>
            <div className="badge" style={{ border: "2px solid #CDFF00" }}>
              VERIFIED
            </div>
          </div>

          <img
            src="https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000"
            className="mint-img"
          ></img>
          <div className="mint-one">1 / 1</div>
        </section>
      </div>
      <div className="mint-des-box">
        <div className="mint-grid-1">
          <span>Description</span>
          <p>
            {" "}
            CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and
            became one of the inspirations for the ERC-721 standard. They have
            been featured in places like The New York Times, Christie’s of
            London, Art|Basel Miami, and The PBS NewsHour.
          </p>
          <div className="mint-col-sup">
            <span>COLLECTION SUPPLY</span> <p>13.00%</p>
          </div>
          <div className="mint-uniq">
            <span>UNIQUE OWNERS</span> <p>26 / 100</p>
          </div>
        </div>
        <div className="mint-grid-2">
          <span style={{ marginLeft: "50px" }}>Start time : Dec 07</span>
          <div className="mint-input-div">
            <div className="timer-box">
              <section className="timer-container">
                <section className="timer">
                  <div>
                    <section>
                      <p>{timerDays}</p>
                      <p>
                        <small>Days</small>
                      </p>
                    </section>
                    <span>:</span>
                    <section>
                      <p>{timerHours}</p>
                      <p>
                        <small>Hours</small>
                      </p>
                    </section>
                    <span>:</span>
                    <section>
                      <p>{timerMinutes}</p>
                      <p>
                        <small>Minutes</small>
                      </p>
                    </section>
                    <span>:</span>
                    <section>
                      <p>{timerSeconds}</p>
                      <p>
                        <small>Seconds</small>
                      </p>
                    </section>
                  </div>
                </section>
              </section>
            </div>
            <button className="minting-btn" onClick={minting}>
              1 Mint per 1 address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mint;
