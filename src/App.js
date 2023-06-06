import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Sign-in" element={<Signin />} />
        <Route path="/Sign-out" element={<Signout />} />
        <Route path="/Forgot-Password" element={<ForgotPassword />} />
        <Route path="/Offers" element={<Offers />} />
      </Routes>
    </Router>
  );
}

export default App;
