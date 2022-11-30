import { useState } from "react";
import useStore from "../../../store/store";
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
          <div className="community-title">Welcome to Community</div>
          <div className="community-box">
            <div
              className="community-nft"
              id="Bored Ape Yacht Club"
              onClick={handleCommunityName}
            >
              BAYC
            </div>
            <div
              className="community-nft"
              id="Crypto Punks"
              onClick={handleCommunityName}
            >
              Crypto Punks
            </div>
            <div
              className="community-nft"
              id="Mustant Ape Yacht Club"
              onClick={handleCommunityName}
            >
              MAYC
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Community;
