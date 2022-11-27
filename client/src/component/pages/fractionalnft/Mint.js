import { useEffect, useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
// import { ABI, ADDRESS } from "./config.js";
import About from "../main/About";
import useStore from "../../../store/store";

function Mint() {
  const { account } = useStore();
  const [provider, setProvider] = useState(undefined);
  const [nowblock, setNowblock] = useState(0);
  const [startBlock, setstartBlock] = useState(0);
  const [amount, setAmount] = useState(0);

  // const getTotal = async () => {
  //     let web3 = new Web3(window.ethereum);
  //     let contract = await new web3.eth.Contract(ABI, ADDRESS);
  //     let total = await contract.methods.totalSupply().call();
  //     setTotalmint(total);
  //   };

  useEffect(() => {
    componentMount();
  }, []);

  //web3에서 제공하는 provider 쓸 수 있게 provider에 넣어두기
  const getProvider = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    return provider;
  };

  function componentMount() {
    setInterval(() => {
      getBlockNumber();
    }, 15000);
  }

  //느리게 가져와짐 애초에 바로 시간 보일 수 있는 방법 생각하기
  const getBlockNumber = async () => {
    let web3 = new Web3(window.ethereum);
    const blockNumber = await web3.eth.getBlockNumber();
    setNowblock(blockNumber);
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

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="mint-box">
      <h1 className="mint-title">
        <div>
          <img src="Puzzle.jpg" />
        </div>
        Mint Now for Piece of NFT
      </h1>

      {/* Todo: 해당 조각nft description  */}

      <div className="mint-info-box">
        <div className="mint-img-box">
          <img
            src="https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000"
            className="mint-img"
          ></img>
        </div>
        <div className="mint-info">
          <h2>Crypto Punk</h2>
          <h3>#1123</h3>
          <h4>CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.</h4>
          <h3>Mint Price:</h3>
          <p>Now Blocknumber : #{nowblock}</p>
          <p>Start Blocknumber : #{startBlock}</p>
          <p>My wallet : {account}</p>
          <p>MAX MINT AMOUNT : 3</p>
          <p>
            <input type="number" min="1" max="3" onChange={handleAmount} />
          </p>
          <button>Mint</button>
        </div>
      </div>
      <About />
    </div>
  );
}

export default Mint;
