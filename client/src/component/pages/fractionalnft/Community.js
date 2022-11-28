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
              id="bayc"
              onClick={handleCommunityName}
            >
              <img src="door.jpg"></img>
            </div>
            <div
              className="community-nft"
              id="cryptopunk"
              onClick={handleCommunityName}
            >
              <img src="door.jpg"></img>
            </div>
            <div
              className="community-nft"
              id="mayc"
              onClick={handleCommunityName}
            >
              <img src="door.jpg"></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Community;
