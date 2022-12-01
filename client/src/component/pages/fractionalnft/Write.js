import { useState } from "react";
import useStore from "../../../store/store";

function Write() {
  const selectList = ["sell", "staking", "etc"]; //agenda type
  const stakingPeriod = ["5 min", "10 min"]; //staking period
  const [type, setType] = useState("");
  const [period, setPeriod] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { account } = useStore();

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleChangePeriod = (e) => {
    setPeriod(e.target.value); // 5 or 10
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    //작성 contract에 보내기. address, agenda type, period, metadata uri (ipfs)
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
                <label
                  for="type"
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                >
                  Agenda type :
                </label>
                <select
                  onChange={handleChangeType}
                  value={type}
                  style={{ marginTop: "17px" }}
                  id={type}
                >
                  {selectList.map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>{" "}
                {type === "staking" && (
                  <select
                    onChange={handleChangePeriod}
                    value={period}
                    style={{ marginTop: "17px" }}
                    id="staking"
                  >
                    {" "}
                    <option value="period" selected>
                      period
                    </option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                  </select>
                )}
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
          <button className="write-btn" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Write;
