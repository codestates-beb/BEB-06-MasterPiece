import { useState, useRef, useEffect } from "react";
import { useStore } from "../../../store/store";
import Agenda from "./Agenda";

function Community() {
  const { openCommunity } = useStore();
  const [communityName, setCommunityName] = useState("");
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const startTimer = () => {
    const countdownDate = new Date("Dec 04, 2022 09:44:00").getTime();

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
        <Agenda communityName={communityName} />
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
          <div className="staking-timer">
            Until {timerDays} : {timerHours} : {timerMinutes} : {timerSeconds}
          </div>
          <div className="community-status-box">
            <div style={{ color: "pink" }}>Staking</div>
            <div style={{ color: "#86fbc1" }}>In progress</div>
            <div style={{ color: "black" }}>Open Jan 11</div>
          </div>
          <div className="community-box">
            <div
              className="community-nft bayc-img"
              id="1"
              onClick={handleCommunityName}
            >
              <span>Bored Ape Yacht Club #3152</span>
              <button className="btn-1">go to join</button>
            </div>
            <div
              className="community-nft crypto-img"
              id="0"
              onClick={handleCommunityName}
            >
              <span>Crypto Punks #1082</span>
              <button className="btn-1">go to join</button>
            </div>
            <div
              className="community-nft mustant-img"
              id="2"
              onClick={handleCommunityName}
            >
              <span>Mutant Ape Yacht Club #5082</span>
              <button className="btn-1">go to join</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Community;
