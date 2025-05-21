import Navbar from "./components/navbar/index";
import HomeHP from "./pages/static/home/index.hp";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="appHP">
        <HomeHP className="homeHP" />
      </div>

      <div className="AppLaptop">
        <Navbar />
      </div>
    </div>
  );
};

export default App;
