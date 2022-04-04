import Header from "./Header";
import Footer from "./Footer";
import { Main } from "./TodayPage";
import styled from "styled-components";

export default function HistoryPage() {
  return (
    <>
      <Header />
      <Main>
        <H1>Histórico</H1>
        <P>Em breve você poderá ver o histórico dos seus hábitos aqui!</P>
      </Main>
      <Footer />
    </>
  );
}

const H1 = styled.h1`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  color: #126ba5;
  width: 90%;
  margin: 0 auto;
  margin-top: 28px;
`;

const P = styled.p`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  width: 90%;
  margin: 0 auto;
  margin-top: 17px;
  color: #666666;
`;
