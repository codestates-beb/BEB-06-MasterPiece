import Ranking from "./Ranking";
import Gallery from "./Gallery";
import About from "./About";

function MainPage() {
  return (
    <div className="main">
      <img src="main.jpg" className="main-image"></img>
      <div className="arrow-box">
        <div className="s1_arrow">
          <div className="scroll-arrow"></div>
          <div className="scroll-arrow"></div>
          <div className="scroll-arrow"></div>
        </div>
      </div>
      <Ranking />
      <Gallery />
      <About />
    </div>
  );
}

export default MainPage;
