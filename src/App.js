import Header from "./components/layout_components/header";
import "./App.css";
import HomeHP from "./pages/mobile_pages/HomeHp";

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
