import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./component/pages/main/MainPage";
import Market from "./component/pages/market/Market";
import Header from "./component/common/header/Header";
import Mypage from "./component/pages/mypage/MyPage";
import Fractionalnft from "./component/pages/fractionalnft/FractionalNft";
import Agenda from "./component/pages/fractionalnft/Agenda";
import Footer from "./component/common/footer/Footer";
import Connectwallet from "./component/pages/connect/Connectwallet";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="background">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/market" element={<Market />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/fractionalnft" element={<Fractionalnft />}></Route>
            <Route path="/agenda" element={<Agenda />}></Route>
            <Route path="/connectwallet" element={<Connectwallet />}></Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
