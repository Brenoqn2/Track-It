import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-trackit.png";
import { Main, Img, Form, Input, Button, P, Spinner } from "./LoginPage";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function RegisterPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    image,
    setImage,
    loading,
    setLoading,
  } = useContext(UserContext);

  const navigate = useNavigate();

  function register(e) {
    setLoading(true);
    e.preventDefault();
    const baseURL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const newUser = {
      email: email,
      password: password,
      name: name,
      image: image,
    };

    console.log(newUser);

    const promise = axios.post(baseURL, newUser);
    promise.then((res) => {
      const user = { email: res.data.email, password: res.data.password };
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      navigate("/");
    });
    promise.catch((res) => {
      setLoading(false);
      console.log(res);
    });
  }

  return (
    <Main>
      <Img src={logo} alt="logo-trackit"></Img>
      <Form onSubmit={register}>
        <Input
          pointer={loading ? "none" : "auto"}
          opacity={loading ? "0.7" : "1"}
          background={loading ? "#F2F2F2" : "white"}
          color={loading ? "#AFAFAF" : "black"}
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></Input>
        <Input
          pointer={loading ? "none" : "auto"}
          opacity={loading ? "0.7" : "1"}
          background={loading ? "#F2F2F2" : "white"}
          color={loading ? "#AFAFAF" : "black"}
          type="password"
          placeholder="senha"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Input
          pointer={loading ? "none" : "auto"}
          opacity={loading ? "0.7" : "1"}
          background={loading ? "#F2F2F2" : "white"}
          color={loading ? "#AFAFAF" : "black"}
          type="text"
          placeholder="nome"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          pointer={loading ? "none" : "auto"}
          opacity={loading ? "0.7" : "1"}
          background={loading ? "#F2F2F2" : "white"}
          color={loading ? "#AFAFAF" : "black"}
          type="url"
          placeholder="foto"
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
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
            "Cadastrar"
          )}
        </Button>
      </Form>
      <Link to="/">
        <P>Já tem uma conta? Faça User!</P>
      </Link>
    </Main>
  );
}
