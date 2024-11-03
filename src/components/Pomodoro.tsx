import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { INIT_TIME, playState, timerState } from "./atom";

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
const Card = styled.div`
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
const PlayBtn = styled.button`
  border: none;
  border-radius: 50%;
  padding: 10px;
  background: #c4382e;
  align-items: center;
  cursor: pointer;
`;
const ResetBtn = styled.button`
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

const Svg = styled.svg`
  width: 68px;
  height: 68px;
`;
const ResetSvg = styled.svg`
  width: 32px;
  height: 32px;
`;

function Pomodoro() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [isActive, setActive] = useRecoilState(playState);
  const toggleActive = () => setActive((prev) => !prev);

  return (
    <Container>
      <Header>Pomodoro</Header>
      <CardHolder>
        <Card> {("0" + Math.floor(timer / 60)).slice(-2)}</Card>
        <Seperator>
          <Dot />
          <Dot />
        </Seperator>
        <Card> {("0" + Math.floor(timer % 60)).slice(-2)}</Card>
      </CardHolder>
      <BtnHolder>
        <PlayBtn onClick={toggleActive}>
          {isActive ? (
            <Svg
              data-slot="icon"
              fill="white"
              stroke-width="4.0"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              ></path>
            </Svg>
          ) : (
            <Svg
              data-slot="icon"
              fill="white"
              viewBox="0 0 14 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z"></path>
            </Svg>
          )}
        </PlayBtn>

        <ResetBtn onClick={() => setTimer(INIT_TIME * 60)}>
          <ResetSvg
            viewBox="0 0 21 19"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_iconCarrier">
              <g
                fill="none"
                fill-rule="evenodd"
                stroke="white"
                stroke-width="2.0"
                stroke-linecap="round"
                stroke-linejoin="round"
                transform="matrix(0 1 1 0 2.5 2.5)"
              >
                <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"></path>
                <path
                  d="m4 1v4h-4"
                  transform="matrix(1 0 0 -1 0 6)"
                ></path>{" "}
              </g>
            </g>
          </ResetSvg>
        </ResetBtn>
      </BtnHolder>
      <RecordHolder>
        <Record>
          <div>
            <span>0</span>
            <span>/</span>
            <span>4</span>
          </div>
          <RecordLabel>ROUND</RecordLabel>
        </Record>
        <Record>
          <div>
            <span>0</span>
            <span>/</span>
            <span>12</span>
          </div>
          <RecordLabel>GOAL</RecordLabel>
        </Record>
      </RecordHolder>
    </Container>
  );
}
export default Pomodoro;
