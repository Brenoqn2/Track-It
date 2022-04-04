import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import dayjs from "dayjs";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import checkMark from "../assets/checkmark.png";

export default function TodayPage() {
  const { percentage, setPercentage, user } = useContext(UserContext);
  const day = dayjs().date();
  const month = dayjs().month();
  const weekDay = dayjs().day();
  const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const days = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const date = `${weekDays[weekDay]}, ${days[day - 1]}/${months[month]}`;

  const [todayHabits, setTodayHabits] = useState([]);

  const getTodayHabits = useCallback(() => {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const TOKEN = user.token;
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const promise = axios.get(URL, config);
    promise.then((response) => {
      setTodayHabits(response.data);
    });
    promise.catch((error) => {
      console.log(error);
    });
  }, [user.token]);

  useEffect(() => getTodayHabits(), [user.token, getTodayHabits]);

  useEffect(() => {
    if (todayHabits !== null) {
      let count = 0;
      todayHabits.forEach((habit) => {
        if (habit.done) count++;
      });
      if (count !== 0) {
        const newPercentage = (count / todayHabits.length) * 100;
        setPercentage(Math.round(newPercentage));
      } else {
        setPercentage(0);
      }
    }
  }, [todayHabits, setPercentage]);

  function checkHabit(done, id) {
    let URL;
    if (!done) {
      URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
    } else {
      URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
    }
    const TOKEN = user.token;
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const promise = axios.post(URL, {}, config);
    promise.then(() => {
      getTodayHabits();
    });
    promise.catch((error) => console.log(error));
  }

  return (
    <>
      <Header></Header>
      <Main>
        <Margin>
          <H1>{date}</H1>
          <H2>
            {percentage === 0 ? (
              <p>Nenhum hábito concluído ainda</p>
            ) : (
              `${percentage}% dos hábitos concluídos`
            )}
          </H2>
          {todayHabits.map((habit) => {
            return (
              <Habit key={habit.id}>
                <h1>{habit.name}</h1>
                <p>
                  Sequência atual:{" "}
                  <Strong color={habit.done ? "#8fc549" : "#666666"}>
                    {habit.currentSequence} dias
                  </Strong>
                </p>
                <p>
                  Seu recorde:{" "}
                  <Strong
                    color={
                      habit.currentSequence === habit.highestSequence &&
                      habit.currentSequence !== 0
                        ? "#8fc549"
                        : "#666666"
                    }
                  >
                    {habit.highestSequence} dias
                  </Strong>
                </p>
                <CheckMarkContainer
                  onClick={() => {
                    checkHabit(habit.done, habit.id);
                  }}
                  background={habit.done ? "#8fc549" : "#EBEBEB"}
                >
                  <img src={checkMark} alt="" />
                </CheckMarkContainer>
              </Habit>
            );
          })}
        </Margin>
      </Main>
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
  overflow-x: hidden;
`;

const Margin = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const H1 = styled.h1`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  color: #126ba5;
  margin: 28px 0 7px 0;
`;

const H2 = styled.h2`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  color: #8fc549;

  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    color: #bababa;
  }
`;

const Habit = styled.div`
  width: 100%;
  height: 94px;
  background: #fff;
  margin-top: 28px;
  position: relative;
  border-radius: 5px;

  div {
    position: absolute;
    width: 69px;
    height: 69px;
    right: 13px;
    bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: ${(props) => props.background};
    border-radius: 5px;

    img {
      width: 35.09px;
    }
  }

  h1 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    position: absolute;
    top: 13px;
    left: 15px;
    max-width: 70%;

    color: #666666;
  }

  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    position: absolute;
    left: 15px;

    color: #666666;

    :first-of-type {
      bottom: 27px;
    }
    :last-of-type {
      bottom: 12px;
    }
  }
`;

const CheckMarkContainer = styled.div`
  position: absolute;
  width: 69px;
  height: 69px;
  right: 13px;
  bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) => props.background};
  border-radius: 5px;
`;

const Strong = styled.b`
  color: ${(props) => props.color};
`;
