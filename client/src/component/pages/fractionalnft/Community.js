import { useState, useRef, useEffect } from "react";
import { useStore, contractStore } from "../../../store/store";
import axios from "axios";
import Web3 from "web3";
import Agenda from "./Agenda";
import abi from "../../abi/erc1155optimizeABI";
import voteAbi from "../../abi/ercvotingABI";

function Community() {
  const { openCommunity } = useStore();
  const { smAddress, daoVotingContract } = contractStore();
  const [communityName, setCommunityName] = useState("");
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [agendaList, setAgendaList] = useState([]);
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

  console.log(filteredAgenda);

  let interval = useRef();

  useEffect(() => {
    getStatus(); //status return
    getAgendaList();
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const getAgendaList = () => {
    axios.get("http://localhost:3001/community").then((res) => {
      setAgendaList(res.data);
      console.log(res.data);
    });
  };

  const getStatus = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, smAddress);
    const status = await contract.methods.showStatus(0).call();
    console.log(status);
  };

  const startTimer = () => {
    const countdownDate = new Date("Dec 04, 2022 09:44:00").getTime(); //staking 끝나는 날짜 설정

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

  const handleCommunityName = (e) => {
    setCommunityName(e.currentTarget.id);
    useStore.setState({ openCommunity: true });
  };

  return (
    <div>
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
                <th>
                  <div>
                    Until {timerDays} : {timerHours} : {timerMinutes} :{" "}
                    {timerSeconds}
                  </div>
                </th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th>
                  <div style={{ color: "pink", fontSize: "23px" }}>Staking</div>
                </th>
                <th>
                  <div style={{ color: "#86fbc1", fontSize: "23px" }}>
                    In progress
                  </div>
                </th>
                <th>
                  <div style={{ color: "black", fontSize: "23px" }}>
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
