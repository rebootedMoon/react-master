import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div``;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Slider = styled.div``;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  margin-bottom: 5px;
`;

const rowVariants = {
  hidden: {
    x: 1000,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -1000,
  },
};
function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });
  const [index, setIndex] = useState(0);
  const increaseIndex = () => setIndex((prev) => prev + 1);
  console.log(data, isLoading);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(
              data?.results[0].backdrop_path || ""
            )}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
              >
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
