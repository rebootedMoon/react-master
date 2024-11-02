import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgb(238, 5, 153),
    rgb(229, 1, 197)
  );
`;

const BigggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.6);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 1),
    0 10px 20px rgba(0, 0, 0, 0.6);
`;
const myVars = {
  start: { scale: 0 },
  end: {
    scale: 1,
    opacity: 1,

    transition: { type: "spring", delay: 1 },
  },
};

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: {
    backgroundColor: "rgba(76, 209, 55, 1.0)",
    transition: { duration: 10 },
  },
};

function App() {
  const x = useMotionValue(0);
  const coord = useTransform(x, [-800, 800], [2, 0.1]);
  const rotate = useTransform(x, [-800, 800], [-360, 360]);
  const { scrollY, scrollYProgress } = useScroll();
  useEffect(() => {
    scrollY.on("change", () =>
      console.log(scrollY.get(), scrollYProgress.get())
    );
  }, [scrollY, scrollYProgress]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg,rgb(199, 238, 5),rgb(104, 229, 1))",
      "linear-gradient(135deg,rgb(238, 5, 153),rgb(229, 1, 197))",
      "linear-gradient(135deg,rgb(5, 199, 238),rgb(35, 1, 229))",
    ]
  );

  return (
    <>
      <Wrapper style={{ background: gradient }}>
        <Box
          style={{ x, scale, rotateZ: rotate }}
          drag="x"
          dragSnapToOrigin
        />
      </Wrapper>
    </>
  );
}
export default App;
