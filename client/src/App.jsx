import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createContext } from "react";
import "./style.css";
import Home from "./pages/Home";
import NavBar from "./components/Nav/NavBar";
import Hotel from "./pages/Hotel";
import Book from "./pages/Book";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

export const navContext = createContext();
function App() {
  const [lang, setLang] = useState("amh");
  const [nightMode, setNightMode] = useState(false);
  const [userType, setUserType] = useState("");
  const [setting, setSetting] = useState(false);
  const [login, setLogin] = useState(true);
  const jwt = localStorage.getItem("hotel-jwt-data-gedeon");
  const user = JSON.parse(localStorage.getItem("hotel-user-data-gedeon"));

  return (
    <navContext.Provider
      value={{
        lang,
        setLang,
        nightMode,
        setNightMode,
        userType,
        setUserType,
        setting,
        login,
        setLogin,
        setSetting,
      }}
    >
      <div className="h-auto text-[20px] bottom-10 bg-gray-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/hotels" element={<Hotel />}></Route>
          <Route path="/reserve" element={<Book />}></Route>
          <Route path="/about" element={<About type="about" />}></Route>
          <Route path="/contact" element={<Contact type="contact" />}></Route>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          {login ? (
            <Route path="login" element={<Login />} />
          ) : (
            <Route
              path="/login"
              element={
                <PageNotFound message="Please First Logout To Your Current Account" />
              }
            />
          )}
          <Route path="/signup" element={<SignUp role="user" />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset" element={<Reset />} />
          {jwt && <Route path="/profile" element={<Profile />} />}
          {user?.role === "admin" && (
            <Route path="/admindashboard" element={<AdminDashboard />} />
          )}
          <Route path="*" element={<PageNotFound message="Page Not Found" />} />
        </Routes>
      </div>
    </navContext.Provider>
  );
}

export default App;
