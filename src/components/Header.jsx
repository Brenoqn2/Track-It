import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <HeaderTag>
      <H1>TrackIt</H1>
      <Img src={user.image} alt=""></Img>
    </HeaderTag>
  );
}

const HeaderTag = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 70px;
  width: 100%;

  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  font-family: "Playball";
  font-style: normal;
  font-weight: 400;
  font-size: 38.982px;
  margin-left: 18px;

  color: #ffffff;
`;

const Img = styled.img`
  width: 51px;
  height: 51px;
  position: absolute;
  right: 18px;
  top: 9px;

  background: url(image.png);
  border-radius: 98.5px;
`;
