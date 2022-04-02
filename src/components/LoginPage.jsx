import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-trackit.png";
import styled from "styled-components";
import { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import React from "react";

export default function LoginPage() {
  const {
    emailLogin,
    setEmailLogin,
    passwordLogin,
    setPasswordLogin,
    setUser,
    localUser,
    loggedIn,
    setLoggedIn,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = useCallback(
    (e = "") => {
      if (e) {
        e.preventDefault();
      }
      setLoading(true);
      const baseURL =
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
      const promise = axios.post(baseURL, {
        email: emailLogin,
        password: passwordLogin,
      });
      promise.then((res) => {
        setUser({ ...res.data });
        setLoading(false);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: res.data.email, password: res.data.password })
        );
        navigate("/hoje");
      });
      promise.catch((err) => {
        alert("Dados Inválidos!");
        setLoading(false);
        localStorage.clear();
      });
    },
    [emailLogin, navigate, passwordLogin, setUser]
  );

  useEffect(() => {
    if (localUser && !loggedIn) {
      setLoggedIn(true);
      login();
    }
  }, [localUser, loggedIn, login, setLoggedIn]);

  return (
    <Main>
      <Img src={logo} alt="logo-trackit"></Img>
      <Form onSubmit={login}>
        <Input
          pointer={loading ? "none" : "auto"}
          opacity={loading ? "0.7" : "1"}
          background={loading ? "#F2F2F2" : "white"}
          color={loading ? "#AFAFAF" : "black"}
          type="email"
          placeholder="email"
          value={emailLogin || ""}
          onChange={(e) => setEmailLogin(e.target.value)}
        ></Input>
        <Input
          pointer={loading ? "none" : "auto"}
          opacity={loading ? "0.7" : "1"}
          color={loading ? "#AFAFAF" : "black"}
          background={loading ? "#F2F2F2" : "white"}
          type="password"
          placeholder="senha"
          value={passwordLogin || ""}
          onChange={(e) => setPasswordLogin(e.target.value)}
        ></Input>
        <Button
          pointer={loading ? "none" : "auto"}
          opacity={loading ? "0.7" : "1"}
          type="submit"
        >
          {loading === true ? (
            <Spinner>
              <ThreeDots color="white" height="45px" width="50px" />
            </Spinner>
          ) : (
            "Entrar"
          )}
        </Button>
      </Form>
      <Link to="/cadastro">
        <P>Não tem uma conta? Cadastre-se!</P>
      </Link>
    </Main>
  );
}

export const Spinner = styled.div`
  width: 100%;
  height: 45px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Img = styled.img`
  width: 180px;
  margin-top: 68px;
`;

export const Form = styled.form`
  width: 303px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  background: ${(props) => props.background};
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  height: 45px;
  width: 100%;
  margin-bottom: 6px;
  padding-left: 11px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  pointer-events: ${(props) => props.pointer};

  color: ${(props) => props.color};

  ::placeholder {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;

    color: #dbdbdb;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  background: #52b6ff;
  border-radius: 4.63636px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 20.976px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
  border: none;
  margin-bottom: 25px;
  pointer-events: ${(props) => props.pointer};
  opacity: ${(props) => props.opacity};
`;

export const P = styled.p`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;

  color: #52b6ff;
`;
