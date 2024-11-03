import { useEffect, useState } from "react";
import styled from "styled-components";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import { useRecoilState } from "recoil";
import { INIT_TIME, playState, timerState } from "./components/atom";

const AppContainer = styled.div`
  padding: 10px;
  max-width: 520px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const TabMenu = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: space-around;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
`;

const TabButton = styled.button<{ isActiveTab: boolean }>`
  flex: 1;
  padding: 4px;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.isActiveTab ? "tomato" : "#555")};
  /* color: black; */
  background: none;
  border: none;
  border-bottom: white;
  border-bottom: ${(props) =>
    props.isActiveTab ? "3px solid tomato" : "none"};
  cursor: pointer;
  outline: none;

  &:hover {
    color: tomato;
  }
`;

const ScreenContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const [activeTab, setActiveTab] = useState("timer");
  const [isActive, setActive] = useRecoilState(playState);
  const [timer, setTimer] = useRecoilState(timerState);

  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        setTimer((count) => {
          if (count !== 0) return count - 1;
          return INIT_TIME;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isActive]);

  return (
    <AppContainer>
      <TabMenu>
        <TabButton
          isActiveTab={activeTab === "timer"}
          onClick={() => setActiveTab("timer")}
        >
          Timer
        </TabButton>
        <TabButton
          isActiveTab={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </TabButton>
      </TabMenu>

      <ScreenContainer>
        {activeTab === "timer" && <Pomodoro />}
        {activeTab === "settings" && <Settings />}
      </ScreenContainer>
    </AppContainer>
  );
}

export default Home;
