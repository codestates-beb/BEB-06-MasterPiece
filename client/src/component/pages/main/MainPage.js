import Ranking from "./Ranking";
import Gallery from "./Gallery";
import About from "./About";

function MainPage() {
  return (
    <div className="main">
      <img src="main.jpg" className="main-image"></img>
      <Ranking />
      <Gallery />
      <About />
    </div>
  );
}

export default MainPage;
