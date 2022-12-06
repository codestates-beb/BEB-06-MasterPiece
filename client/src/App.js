import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./component/pages/main/MainPage";
import Header from "./component/common/header/Header";
import Mypage from "./component/pages/mypage/MyPage";
import Mint from "./component/pages/fractionalnft/Mint";
import Community from "./component/pages/fractionalnft/Community";
import Detail from "./component/pages/fractionalnft/Detail";
import Write from "./component/pages/fractionalnft/Write";
import Footer from "./component/common/footer/Footer";
import Connectwallet from "./component/pages/connect/Connectwallet";
import Roadmap from "./component/pages/roadmap/Roadmap";
import Loading from "./component/common/loading";
function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="background">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/mint" element={<Mint />}></Route>
            <Route path="/roadmap" element={<Roadmap />}></Route>
            <Route path="/community" element={<Community />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
            <Route path="/write" element={<Write />}></Route>
            <Route path="/connectwallet" element={<Connectwallet />}></Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
