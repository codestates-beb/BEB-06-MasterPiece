import { useState } from "react";
import useStore from "../../../store/store";

function Write() {
  const selectList = ["sell", "staking"];
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { account } = useStore();

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="agenda-box">
      <div className="vertical-line"></div>
      <div className="agenda-img">
        <img src="gallery2.jpg" className="agenda-img" />
      </div>
      <div className="agenda-title">
        <p>Bored Ape Yacht Club</p>
        <p style={{ fontSize: "20px", color: "#CDFF00" }}>#15923</p>
        <div className="write-box">
          <div className="agenda-profile-box">
            <img src="profile.jpg" className="agenda-profile"></img>
            <div className="agenda-single">
              <div className="agenda-address">
                {account.slice(0, 5)}...{account.slice(-3)}
              </div>
              <div>
                {" "}
                <select
                  onChange={handleChangeType}
                  value={type}
                  style={{ marginTop: "17px", marginLeft: "35px" }}
                >
                  {selectList.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <input
            placeholder="Title..."
            className="agenda-input1"
            onChange={handleChangeTitle}
          ></input>
          <textarea
            placeholder="Description..."
            type="text"
            className="agenda-input2"
            onChange={handleChangeDes}
          ></textarea>
          <button className="write-btn">submit</button>
        </div>
      </div>
    </div>
  );
}

export default Write;
