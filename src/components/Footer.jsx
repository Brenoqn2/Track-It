import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Footer() {
  const { percentage } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <FooterTag>
      <Container>
        <H2 onClick={() => navigate("/habitos")}>Hábitos</H2>
        <Div onClick={() => navigate("/hoje")}>
          <CircularProgressbar
            value={percentage}
            text={`Hoje`}
            background
            backgroundPadding={6}
            styles={{
              text: {
                fontSize: "18px",
                fill: "white",
                fontFamily: "Lexend Deca",
              },
              background: {
                fill: "#52B6FF",
              },
              path: {
                stroke: "white",
              },
              trail: {
                stroke: "#52B6FF",
              },
            }}
          />
        </Div>
        <H2 onClick={() => navigate("/historico")}>Histórico</H2>
      </Container>
    </FooterTag>
  );
}

const FooterTag = styled.footer`
  position: fixed;
  height: 70px;
  left: 0px;
  bottom: 0px;
  width: 100%;

  background: #ffffff;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Div = styled.div`
  width: 91px;
  position: relative;
  margin: 0 32px 0 32px;
  bottom: 20px;
`;

const H2 = styled.h2`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  text-align: center;

  color: #52b6ff;
`;
