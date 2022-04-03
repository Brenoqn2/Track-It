import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

export default function TodayPage() {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}

export const Main = styled.main`
  background: #e5e5e5;
  top: 70px;
  bottom: 70px;
  left: 0px;

  width: 100%;
  height: calc(100vh - 140px);
  position: fixed;

  overflow-y: auto;
`;
