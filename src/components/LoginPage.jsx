import { Link } from "react-router-dom";
import logo from "../assets/logo-trackit.png";
import styled from "styled-components";

export default function LoginPage() {
  return (
    <Main>
      <Img src={logo} alt="logo-trackit"></Img>
      <Form>
        <Input type="email" placeholder="email"></Input>
        <Input type="password" placeholder="senha"></Input>
        <Button type="submit">Entrar</Button>
      </Form>
      <Link to="/cadastro">
        <P>Não tem uma conta? Cadastre-se!</P>
      </Link>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 180px;
  margin-top: 68px;
`;

const Form = styled.form`
  width: 303px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background: #ffffff;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  height: 45px;
  width: 100%;
  margin-bottom: 6px;
  padding-left: 11px;

  ::placeholder {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;

    color: #dbdbdb;
  }
`;

const Button = styled.button`
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
`;

const P = styled.p`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;

  color: #52b6ff;
`;
