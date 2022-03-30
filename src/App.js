import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { useState } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { UserContext } from "./contexts/UserContext";

export default function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [emailLogin, setEmailLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <LoginContext.Provider
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
          setUser,
          user,
        }}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
        </Routes>
      </LoginContext.Provider>
      <UserContext.Provider value={{ user }}>
        <Routes></Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
