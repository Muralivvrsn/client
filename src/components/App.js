import { BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Onboard from "./Onboard";
import Home from "./Home";
import Jobs from './Jobs';
import Loading from "./extraCredentails/Loading";
import Email from "./EmailVerification";
import { AnimatePresence } from "framer-motion"; 

import "../App.css";
function App() {
  
  return (
    <AnimatePresence>
    <BrowserRouter>
      <Loading />
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Onboard />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/Jobs" exact element={<Jobs/>}></Route>
          <Route path="/email-verify" exact element={<Email/>}></Route>
        </Routes>
        
      </div>
    </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
