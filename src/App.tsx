import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgb(238, 5, 153),
    rgb(229, 1, 197)
  );
  /* flex-direction: column; */
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.6);
`;

const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #00a5ff;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 0 10px 20px
    rgba(0, 0, 0, 0.6);
`;

function App() {
  const [clicked, setClicked] = useState(true);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        {!clicked ? (
          <Circle
            layoutId="circle"
            style={{ borderRadius: 50, scale: 1 }}
          />
        ) : null}
      </Box>
      <Box>
        {clicked ? (
          <Circle
            layoutId="circle"
            style={{ borderRadius: 0, scale: 2 }}
          />
        ) : null}
      </Box>
    </Wrapper>
  );
}
export default App;
