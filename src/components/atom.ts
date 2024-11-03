import { atom } from "recoil";

export const INIT_TIME = 25;

export const timerState = atom({
  key: "timerState",
  default: INIT_TIME * 60,
});

export const initialTimerState = atom({
  key: "initialTimerState",
  default: INIT_TIME,
});

export const playState = atom({
  key: "playState",
  default: false,
});

export const roundState = atom({
  key: "roundState",
  default: { current: 0, target: 2 },
});

export const goalState = atom({
  key: "goalState",
  default: { current: 0, target: 3 },
});
