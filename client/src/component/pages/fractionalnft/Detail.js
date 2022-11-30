import { useEffect } from "react";
import { dummydata } from "../../common/dummy/dummydata";

function Detail({ selectId }) {
  useEffect(() => {
    progressBar();
  }, []);
  function progressBar() {
    let circle = document.getElementById("one");
    let text = document.getElementById("percent-one");
    let angle = 0;
    let percent = 40 * 4.7; //agree 수 여기서 setting

    let timer = setInterval(() => {
      circle.setAttribute("stroke-desharray", angle + ", 20000");
      text.innerHTML = parseInt((angle / 471) * 100);
      if (angle >= percent) {
        clearInterval(timer);
      }
      angle += 6;
    }, 30);

    let circle1 = document.getElementById("two");
    let text1 = document.getElementById("percent-two");
    let angle1 = 0;
    let percent1 = 60 * 4.7; //vote rate 여기서 setting

    let timer1 = setInterval(function () {
      circle1.setAttribute("stroke-dasharray", angle1 + ", 20000");
      text1.innerHTML = parseInt((angle1 / 471) * 100) + "%";
      if (angle1 >= percent1) {
        clearInterval(timer1);
      }
      angle1 += 7;
    }, 30);

    //---

    let circle2 = document.getElementById("three");
    let text2 = document.getElementById("percent-three");
    let angle2 = 0;
    let percent2 = 20 * 4.7; //disagree 수 여기서 setting

    let timer2 = setInterval(function () {
      circle2.setAttribute("stroke-dasharray", angle2 + ", 20000");
      text2.innerHTML = parseInt((angle2 / 471) * 100);
      if (angle2 >= percent2) {
        clearInterval(timer2);
      }
      angle2 += 6;
    }, 30);
  }

  return (
    <div>
      {dummydata
        .filter((a) => {
          return a.id == selectId;
        })
        .map((item) => {
          return (
            <div
              className="agenda-box"
              style={{ height: "600px", width: "75%" }}
            >
              <div className="vertical-line"></div>
              <div className="agenda-img">
                <img src="gallery2.jpg" className="agenda-img" />
              </div>
              <div className="agenda-title">
                <p>{item.collectionname}</p>
                <p style={{ fontSize: "20px", color: "#CDFF00" }}>#1143</p>
                <div className="agenda-single-box">
                  <img src={item.profile} className="agenda-profile"></img>
                  <div className="agenda-single">
                    <div className="agenda-address">
                      {item.address}{" "}
                      <div className="agenda-type">{item.type}</div>
                    </div>
                    <div className="agenda-single-title1">{item.title}</div>
                    <div className="agenda-single-content">{item.content}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div className="agenda-detail-box">
        <svg className="containerbox" width="600px" height="210px">
          <g id="">
            <circle className="progress" id="one" cx="100" cy="100" r="75px" />
            <text
              id="percent-one"
              textAnchor="middle"
              x="100"
              y="112"
              style={{ fontSize: "36px" }}
            >
              {" "}
              0{" "}
            </text>
            <circle class="progress" id="two" cx="300" cy="100" r="75px" />
            <text
              id="percent-two"
              textAnchor="middle"
              x="300"
              y="112"
              style={{ fontSize: "36px" }}
            >
              {" "}
              0{" "}
            </text>
            <circle class="progress" id="three" cx="500" cy="100" r="75px" />
            <text
              id="percent-three"
              textAnchor="middle"
              x="500"
              y="112"
              style={{ fontSize: "36px" }}
            >
              {" "}
              0{" "}
            </text>
          </g>
        </svg>
        <div id="lang">
          <div>Agree</div>
          <div>Vote rate</div>
          <div>Disagree</div>
        </div>
        <div className="agenda-detail-btn-box">
          <button className="agenda-detail-btn">agree</button>
          <button className="agenda-detail-btn">disagree</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
