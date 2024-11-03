import { useRecoilState } from "recoil";
import { useState } from "react";
import styled from "styled-components";
import {
  timerState,
  roundState,
  goalState,
  INIT_TIME,
  initialTimerState,
  playState,
} from "./atom";

const Container = styled.div`
  padding: 30px 20px;
  margin: 0 auto;
  width: 100vw;
  height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: tomato;
  color: #ccc;
`;
const Header = styled.header`
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 20px 0 50px 0;
`;
const SettingGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: rgb(221, 70, 19);
  border: 1px solid tomato;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #cccccc;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #555;
  border-radius: 3px;
  background-color: #ffdab9;
  color: #333333;
  width: 100%;
`;

const Button = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  color: #fff;
  background-color: #ff4500;
  border: #cc3700 1px solid;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #cc3700;
  }
`;

function Settings() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);
  const [isActive, setActive] = useRecoilState(playState);
  const [initialTimer, setInitialTimer] =
    useRecoilState(initialTimerState);

  const [timerInput, setTimerInput] = useState(initialTimer); // 초기값을 사용하여 상태 설정
  const [roundInput, setRoundInput] = useState(round.target);
  const [goalInput, setGoalInput] = useState(goal.target);

  const handleTimerSave = () => {
    setInitialTimer(timerInput); // 초기 설정 상태 업데이트
    setTimer(timerInput * 60); // 타이머 상태도 분을 초로 변환하여 업데이트
    setActive(false);
  };
  const handleRoundSave = () =>
    setRound((prev) => ({ ...prev, target: roundInput }));
  const handleGoalSave = () =>
    setGoal((prev) => ({ ...prev, target: goalInput }));

  return (
    <Container>
      <Header>Setting</Header>
      <SettingGroup>
        <Label>Timer</Label>
        <Description>
          Set the time in minutes for each round.
        </Description>
        <Input
          type="number"
          value={timerInput}
          onChange={(e) => setTimerInput(Number(e.target.value))}
          placeholder={`${initialTimer}`} // 초기 설정값을 placeholder로 사용
        />
        <Button onClick={handleTimerSave}>Save Timer</Button>
      </SettingGroup>

      <SettingGroup>
        <Label>Rounds</Label>
        <Description>Set the number of rounds.</Description>
        <Input
          type="number"
          value={roundInput}
          onChange={(e) => setRoundInput(Number(e.target.value))}
          placeholder={`${round}`}
        />
        <Button onClick={handleRoundSave}>Save Rounds</Button>
      </SettingGroup>

      <SettingGroup>
        <Label>Goals</Label>
        <Description>
          Set the goal count for each session.
        </Description>
        <Input
          type="number"
          value={goalInput}
          onChange={(e) => setGoalInput(Number(e.target.value))}
          placeholder={`${goal}`}
        />
        <Button onClick={handleGoalSave}>Save Goals</Button>
      </SettingGroup>
    </Container>
  );
}

export default Settings;
