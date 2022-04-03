import Header from "./Header";
import Footer from "./Footer";
import { Main } from "./TodayPage";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function HabitsPage() {
  const { habits, setHabits, user } = useContext(UserContext);
  const [creatingHabit, setCreatingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDays, setNewHabitDays] = useState([]);
  const weekDays = [
    { num: 0, day: "D" },
    { num: 1, day: "S" },
    { num: 2, day: "T" },
    { num: 3, day: "Q" },
    { num: 4, day: "Q" },
    { num: 5, day: "S" },
    { num: 6, day: "S" },
  ];

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
            <Input placeholder="nome do hábito"></Input>
            <Dias>
              {weekDays.map((obj) => {
                const day = obj.day;
                const num = obj.num;
                return (
                  <Dia
                    color={newHabitDays.includes(num) ? "#FFFFFF" : "#DBDBDB"}
                    background={
                      !newHabitDays.includes(num) ? "#FFFFFF" : "#DBDBDB"
                    }
                    key={`dia${num}`}
                    onClick={() => {
                      console.log(day);
                      if (newHabitDays.includes(num)) {
                        const remainingDays = newHabitDays.filter(
                          (el) => el !== num
                        );
                        console.log(remainingDays);
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

  background: #ffffff;
  border-radius: 5px;
`;

const Input = styled.input`
  background: #ffffff;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  width: 303px;
  height: 45px;
  margin: 18px 18px 8px 19px;

  ::placeholder {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    padding-left: 17px;

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
  border: 1px solid #d5d5d5;
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

  :first-of-type {
    margin-left: 0px;
  }
`;
