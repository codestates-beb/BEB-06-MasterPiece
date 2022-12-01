import { useState } from "react";
import { useStore } from "../../../store/store";
import Agenda from "./Agenda";

function Community() {
  const { openCommunity } = useStore();
  const [communityName, setCommunityName] = useState("");

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
