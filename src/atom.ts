import { atom } from "recoil";

export const INIT_TIME = 25;

export const timerState = atom({
  key: "timerState",
  default: INIT_TIME * 60,
});
