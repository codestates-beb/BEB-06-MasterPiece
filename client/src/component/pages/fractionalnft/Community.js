import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, contractStore } from "../../../store/store";
import axios from "axios";
import Web3 from "web3";
import Agenda from "./Agenda";
import abi from "../../abi/erc1155optimizeABI"; //masterpiece contract
import { SoulModals, WalletModals } from "../../common/Modals/Modals";

function Community() {
  const navigate = useNavigate();
  const { account } = useStore();
  const { openCommunity } = useStore();
  const { smAddress, daoVotingContract } = contractStore();
  const [communityName, setCommunityName] = useState("");
  const [soulModal, setSoulModal] = useState(false); //modal
  const [walletModal, setWalletModal] = useState(false); //madal
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [stakingEnd, setStakingEnd] = useState(false);
  const [agendaList, setAgendaList] = useState([]);
  const [status, setStatus] = useState([]); //0: Crypto Punks , 1: bayc, 2:mayc
  const filteredAgenda = agendaList.filter((a) => {
    if (communityName == "0") {
      return a.collectionName === "Crypto Punks";
    }
    if (communityName == "1") {
      return a.collectionName === "Bored Ape Yacht Club";
    }
    if (communityName == "2") {
      return a.collectionName === "Mutant Ape Yacht Club";
    }
  });

  let interval = useRef();
  console.log(filteredAgenda);
  useEffect(() => {
    soulCheck();
    getStatus(); //status return
    getAgendaList();
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  //지갑연결, sbt 있는지 check
  const soulCheck = async () => {
    const web3 = new Web3(window.ethereum);
    if (account == 0) {
      setWalletModal(true);
    } else {
      const contract = new web3.eth.Contract(abi, smAddress);
      let souls = [];
      for (let i = 0; i < 3; i++) {
        const soulcheck = await contract.methods
          .soulBalanceOf(i, account) //crypto punks 에 대한 soul
          .call()
          .then((res) => {
            souls[i] = res;
          });
      }
      if (souls.includes("1")) {
        //원래대로 돌려놓기
        setSoulModal(false);
      } else {
        setSoulModal(true);
      }
    }
  };

  const getAgendaList = () => {
    axios.get("http://localhost:3001/community").then((res) => {
      setAgendaList(res.data);
    });
  };
  const getStatus = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, smAddress);
    //result값 별로 status 저장
    let array = [];
    for (let i = 0; i < 3; i++) {
      await contract.methods
        .showStatus(i)
        .call()
        .then((res) => {
          if (res === "0") {
            array.push("Voting");
          }
          if (res === "1") {
            array.push("Sell");
          }
          if (res === "2") {
            array.push("Staking");
          }
        });
    }
    setStatus(array);
  };

  const startTimer = () => {
    const countdownDate = new Date("Dec 05, 2022 13:00:00").getTime(); //staking duration 끝나는 날짜 설정

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
        setStakingEnd(true);
      }
    }, 1000);
  };

  const handleCommunityName = (e) => {
    setCommunityName(e.currentTarget.id);
    useStore.setState({ openCommunity: true });
  };

  return (
    <div>
      {walletModal && <WalletModals />}
      {soulModal && <SoulModals />}
      {openCommunity ? (
        <Agenda communityName={communityName} filteredAgenda={filteredAgenda} />
      ) : (
        <div>
          <div className="community-title">
            <div>
              <img src="Puzzle.jpg" style={{ width: "50px" }} />
            </div>
            &nbsp;Maker Governance
          </div>
          <div className="community-des">
            Join a decentralized community the integrity of the Maker
            <br /> Protocol through discussion, and on-chain voting with SBT.
          </div>
          <table style={{ margin: "0px auto", borderSpacing: "69px 8px" }}>
            <thead>
              <tr>
                {/* /////// staking 상태라면 시간 표시해주기 ex 5분동안 staking이면 5분동안만 활성화 후 status가 꺼지게 //////*/}
                {status.map((a) => {
                  if (a == "Staking" && stakingEnd) {
                    return (
                      <th>
                        <div>
                          Until {timerDays} : {timerHours} : {timerMinutes} :{" "}
                          {timerSeconds}
                        </div>
                      </th>
                    );
                  } else {
                    return <th></th>;
                  }
                })}
              </tr>
              <tr>
                <th>
                  <div style={{ color: "pink", fontSize: "23px", marginLeft:"23px" }}>
                    {status[1]}
                  </div>
                </th>
                <th>
                  <div style={{ color: "#86fbc1", fontSize: "23px", marginLeft:"23px" }}>
                    In progress
                  </div>
                </th>
                <th>
                  <div style={{ color: "black", fontSize: "23px", marginLeft:"23px" }}>
                    Open Jan 11
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    className="community-nft bayc-img"
                    id="1"
                    onClick={handleCommunityName}
                  >
                    <span>Bored Ape Yacht Club #3152</span>
                    <button className="btn-1">go to join</button>
                  </div>
                </td>
                <td>
                  <div
                    className="community-nft crypto-img"
                    id="0"
                    onClick={handleCommunityName}
                  >
                    <span>Crypto Punks #1082</span>
                    <button className="btn-1">go to join</button>
                  </div>
                </td>
                <td>
                  <div
                    className="community-nft mustant-img"
                    id="2"
                    onClick={handleCommunityName}
                  >
                    <span>Mutant Ape Yacht Club #5082</span>
                    <button className="btn-1">go to join</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Community;
