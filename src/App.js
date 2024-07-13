import Header from "./components/header";
import Footer from "./components/footer";
import SectionHome from "./components/SectionHome";
import AboutUs from "./components/aboutUs";
import OurTeam from "./components/ourTeam";
import OurServices from "./components/ourServices";

function App() {
  return (
    <div className="App">
      <Header/>
      <SectionHome/>
      <AboutUs/>
      <OurTeam/>
      <OurServices/>
      <Footer/>
    </div>
  );
}

export default App;
