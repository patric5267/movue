import Home from "./component/Home";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Popular from "./component/Popular";
import Upcoming from "./component/Upcoming";
import Top from "./component/Top";
import Info from "./component/Info";
import Search from "./component/Search";

function App() {
  return (
    <>
    <Router>
   
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/upcoming' element={<Upcoming/>}/>
        <Route path='/top' element={<Top/>}/>
        <Route path='/search/:search' element={<Search/>}/>
        <Route path='/info/:id' element={<Info/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
