import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  INIT_TIME,
  initialTimerState,
  playState,
  timerState,
  roundState,
  goalState,
} from "./atom";
import { motion } from "framer-motion";

const Container = styled.div`
  padding: 30px 10px;
  margin: 0 auto;
  width: 100vw;
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* align-items: center; */
  background-color: tomato;
  /* max-width: 480px; */
`;
const Header = styled.header`
  font-size: 48px;
  font-weight: 600;
  color: white;
  text-align: center;
`;
const Wrapper = styled.div``;
const CardHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled(motion.div)`
  width: 150px;
  display: flex;
  height: 200px;
  border-radius: 15px;
  background-color: white;
  color: tomato;

  align-items: center;
  justify-content: center;
  font-size: 72px;
  font-weight: 800;
`;
const Seperator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;
const Dot = styled.div`
  width: 12px;
  height: 12px;

  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
`;
const BtnHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const PlayBtn = styled(motion.button)`
  border: none;
  border-radius: 50%;
  padding: 10px;
  background: #c4382e;
  align-items: center;
  cursor: pointer;
`;
const ResetBtn = styled(motion.button)`
  position: absolute;
  left: 110px;
  background: transparent;

  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
`;

const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RecordHolder = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const RecordLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
`;

const ResetSvg = styled.svg`
  width: 32px;
  height: 32px;
`;
const PauseIcon = styled.svg`
  width: 68px;
  height: 68px;
  fill: white;
  stroke-width: 4;
  stroke: white;
`;
const PlayIcon = styled.svg`
  width: 68px;
  height: 68px;
  fill: white;
`;
const ResetIcon = styled.svg`
  width: 32px;
  height: 32px;
  fill: #000000;
  stroke: white;
  stroke-width: 2;
`;
const cardVariants = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
    },
  },
};
const svgVariants = {
  hover: {
    scale: 1.2,
    cursor: "pointer",
    transition: { duration: 0.5 },
  },
};

function Pomodoro() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [isActive, setActive] = useRecoilState(playState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);
  const initialTimer = useRecoilValue(initialTimerState);

  const isFirstRender = useRef(true);
  const roundResetTriggered = useRef(false); // 라운드가 목표에 도달했을 때만 goal을 증가

  const toggleActive = () => setActive((prev) => !prev);

  const handleReset = () => {
    setActive(false);
    setTimer(initialTimer * 60);
    setRound({ current: 0, target: round.target });
    setGoal({ current: 0, target: goal.target });
    roundResetTriggered.current = false;
  };

  useEffect(() => {
    if (timer === 0) {
      setRound((prevRound) => {
        const newCurrent = prevRound.current + 1;
        const isRoundReset = newCurrent >= prevRound.target;
        roundResetTriggered.current = isRoundReset;

        return {
          ...prevRound,
          current: isRoundReset ? 0 : newCurrent,
        };
      });
      setTimer(initialTimer * 60);
      setActive(false);
      console.log("Timer reached zero, round updated");
    }
  }, [timer, initialTimer, setRound, setTimer, setActive]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log("First render, goal update skipped");
      return;
    }

    if (
      round.current === 0 &&
      timer === initialTimer * 60 &&
      goal.current < goal.target &&
      round.target !== 0 &&
      roundResetTriggered.current
    ) {
      setGoal((prevGoal) => ({
        ...prevGoal,
        current: prevGoal.current + 1,
      }));
      roundResetTriggered.current = false;
      console.log("Goal updated:", goal.current + 1);
    }
  }, [
    round.current,
    timer,
    initialTimer,
    goal.target,
    setGoal,
    round.target,
  ]);

  return (
    <Container>
      <Header>Pomodoro</Header>
      <CardHolder>
        <Card
          key={Math.floor(timer / 60)}
          variants={cardVariants}
          initial="start"
          animate="end"
        >
          {("0" + Math.floor(timer / 60)).slice(-2)}
        </Card>
        <Seperator>
          <Dot />
          <Dot />
        </Seperator>
        <Card
          key={Math.floor(timer % 60)}
          variants={cardVariants}
          initial="start"
          animate="end"
        >
          {("0" + Math.floor(timer % 60)).slice(-2)}
        </Card>
      </CardHolder>
      <BtnHolder>
        <PlayBtn
          onClick={toggleActive}
          variants={svgVariants}
          whileHover={"hover"}
        >
          {isActive ? (
            <PauseIcon
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </PauseIcon>
          ) : (
            <PlayIcon
              viewBox="0 0 14 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
            </PlayIcon>
          )}
        </PlayBtn>

        <ResetBtn
          onClick={handleReset}
          variants={svgVariants}
          whileHover={"hover"}
        >
          <ResetIcon
            viewBox="0 0 21 19"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g id="SVGRepo_iconCarrier">
              <g
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
                transform="matrix(0 1 1 0 2.5 2.5)"
              >
                <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />
                <path
                  d="m4 1v4h-4"
                  transform="matrix(1 0 0 -1 0 6)"
                />
              </g>
            </g>
          </ResetIcon>
        </ResetBtn>
      </BtnHolder>
      <RecordHolder>
        <Record>
          <div>
            <span>{round.current}</span>
            <span>/</span>
            <span>{round.target}</span>
          </div>
          <RecordLabel>ROUND</RecordLabel>
        </Record>
        <Record>
          <div>
            <span>{goal.current}</span>
            <span>/</span>
            <span>{goal.target}</span>
          </div>
          <RecordLabel>GOAL</RecordLabel>
        </Record>
      </RecordHolder>
    </Container>
  );
}

export default Pomodoro;
