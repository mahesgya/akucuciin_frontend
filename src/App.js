import Header from "./components/header";
import Footer from "./components/footer";
import SectionHome from "./components/SectionHome";
import AboutUs from "./components/aboutUs";
import OurTeam from "./components/ourTeam";
import OurServices from "./components/ourServices";
import "./App.css";
import NavbarHP from "./ComponentsHP/NavbarHP";

import HomeHP from "./ComponentsHP/HomeHp";

const App = () => {
  return (
    <div className="App">
      <div className="appHP">
        <HomeHP className="homeHP" />
      </div>

      <div className="AppLaptop">
        <Header />
       
      </div>
    </div>
  );
};

export default App;
