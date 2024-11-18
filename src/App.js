import Header from "./components/header";
import "./App.css";
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
