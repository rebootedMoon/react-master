import { atom } from "recoil";

export const INIT_TIME = 25;

export const timerState = atom({
  key: "timerState",
  default: INIT_TIME * 60,
});
export const playState = atom({
  key: "playState",
  default: false,
});

export const roundState = atom({
  key: "roundState",
  default: 4,
});

export const goalState = atom({
  key: "goalState",
  default: 12,
});
