import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HabitsPage from "./components/HabitsPage";
import TodayPage from "./components/TodayPage";
import HistoryPage from "./components/HistoryPage";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import "./reset.css";

export default function App() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [emailLogin, setEmailLogin] = useState(
    localUser ? localUser.email : ""
  );
  const [passwordLogin, setPasswordLogin] = useState(
    localUser ? localUser.password : ""
  );
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [percentage, setPercentage] = useState(30);

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        image,
        setImage,
        emailLogin,
        setEmailLogin,
        passwordLogin,
        setPasswordLogin,
        user,
        setUser,
        localUser,
        loggedIn,
        setLoggedIn,
        percentage,
        setPercentage,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/habitos" element={<HabitsPage />} />
          <Route path="/hoje" element={<TodayPage />} />
          <Route path="historico" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
