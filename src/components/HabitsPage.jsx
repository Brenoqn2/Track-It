import Header from "./Header";
import Footer from "./Footer";
import { Main } from "./TodayPage";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function HabitsPage() {
  const { habits, setHabits, user } = useContext(UserContext);
  const [creatingHabit, setCreatingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDays, setNewHabitDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const weekDays = [
    { num: 0, day: "D" },
    { num: 1, day: "S" },
    { num: 2, day: "T" },
    { num: 3, day: "Q" },
    { num: 4, day: "Q" },
    { num: 5, day: "S" },
    { num: 6, day: "S" },
  ];

  function createHabit() {
    setLoading(true);
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const TOKEN = user.token;
    const object = {
      name: newHabitName,
      days: newHabitDays,
    };
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const promise = axios.post(URL, object, config);
    promise.then((res) => {
      console.log(res);
      setLoading(false);
    });
    promise.catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }

  return (
    <>
      <Header />
      <Main>
        <TitleContainer>
          <H1>Meus hábitos</H1>
          <Button onClick={() => setCreatingHabit(true)}>
            <p>+</p>
          </Button>
        </TitleContainer>
        {creatingHabit ? (
          <CreateContainer>
            <Input
              color={loading ? "#AFAFAF" : "black"}
              background={loading ? "#F2F2F2" : "white"}
              pointer={loading ? "none" : "auto"}
              value={newHabitName}
              placeholder="nome do hábito"
              onChange={(e) => setNewHabitName(e.target.value)}
            ></Input>
            <Dias>
              {weekDays.map((obj) => {
                const day = obj.day;
                const num = obj.num;
                return (
                  <Dia
                    pointer={loading ? "none" : "auto"}
                    color={newHabitDays.includes(num) ? "#FFFFFF" : "#CFCFCF"}
                    background={
                      !newHabitDays.includes(num) ? "#FFFFFF" : "#CFCFCF"
                    }
                    key={`dia${num}`}
                    onClick={() => {
                      if (newHabitDays.includes(num)) {
                        const remainingDays = newHabitDays.filter(
                          (el) => el !== num
                        );
                        setNewHabitDays(remainingDays);
                      } else {
                        setNewHabitDays([...newHabitDays, num]);
                      }
                    }}
                  >
                    {day}
                  </Dia>
                );
              })}
            </Dias>
            <CancelButton
              opacity={loading ? "0.7" : "1"}
              pointer={loading ? "none" : "auto"}
              onClick={() => setCreatingHabit(false)}
            >
              Cancelar
            </CancelButton>
            <ConfirmButton
              opacity={loading ? "0.7" : "1"}
              pointer={loading ? "none" : "auto"}
              onClick={() => createHabit()}
            >
              {loading ? (
                <LoadingDiv>
                  <ThreeDots color="white" height="35px" width="50px" />
                </LoadingDiv>
              ) : (
                <p>Salvar</p>
              )}
            </ConfirmButton>
          </CreateContainer>
        ) : (
          <></>
        )}
        {habits.length === 0 ? (
          <Warning>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </Warning>
        ) : (
          <h1>xd</h1>
        )}
      </Main>
      <Footer />
    </>
  );
}

const TitleContainer = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 22px;
  height: 35px;
  display: flex;
  align-items: center;
  width: 90vw;
`;

const H1 = styled.h1`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;

  color: #126ba5;
`;

const Button = styled.button`
  width: 40px;
  height: 35px;

  background: #52b6ff;
  border-radius: 4.63636px;
  border: none;

  position: absolute;
  bottom: 0px;
  right: 0px;

  p {
    font-size: 27px;
    color: white;
    font-family: "Lexend Deca";
    position: relative;
    bottom: 3px;
  }
`;

const Warning = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 28px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;

  color: #666666;
`;

const CreateContainer = styled.div`
  width: 340px;
  height: 180px;
  margin: 0 auto;
  margin-top: 20px;
  position: relative;

  background: #ffffff;
  border-radius: 5px;
`;

const Input = styled.input`
  background: ${(props) => props.background};
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  width: 303px;
  height: 45px;
  margin: 18px 18px 8px 19px;

  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  padding-left: 17px;

  color: ${(props) => props.color};
  pointer-events: ${(props) => props.pointer};
  ::placeholder {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: #dbdbdb;
  }
`;

const Dias = styled.div`
  width: 303px;
  height: 30px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Dia = styled.div`
  width: 30px;
  height: 30px;

  background: ${(props) => props.background};
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: ${(props) => props.color};
  pointer-events: ${(props) => props.pointer};

  :first-of-type {
    margin-left: 0px;
  }
`;

const CancelButton = styled.button`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  border: none;
  background: none;
  position: absolute;
  bottom: 23px;
  right: 123px;

  text-align: center;

  color: #52b6ff;
  pointer-events: ${(props) => props.pointer};
  opacity: ${(props) => props.opacity};
`;

const ConfirmButton = styled.button`
  position: absolute;
  width: 84px;
  height: 35px;
  bottom: 15px;
  right: 16px;

  background: #52b6ff;
  border-radius: 4.63636px;
  border: none;
  pointer-events: ${(props) => props.pointer};
  opacity: ${(props) => props.opacity};
  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    text-align: center;
    color: #ffffff;
    position: relative;
    bottom: 2px;
  }
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 35px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
  }
`;
