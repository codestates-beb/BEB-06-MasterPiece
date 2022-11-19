import Ranking from "./Ranking";
import Gallery from "./Gallery";

function MainPage() {
  return (
    <div className="main">
      <img src="main.jpg" className="main-image"></img>
      <Ranking />
      <Gallery />
    </div>
  );
}

export default MainPage;
