import { useQuery } from "react-query";
import {
  getComingSoon,
  getMovie,
  IGetMoviesResult,
  makeBgPath,
  makeImagePath,
} from "../api";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import MovieDetail from "../components/MovieDetail";

const Wrapper = styled.div`
  overflow-x: hidden;
  padding-bottom: 200px;
`;
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
const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Img = styled(motion.image)<{ bgPhoto: string }>`
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 30vw;
  height: 65vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 40px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 300px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding: 10px;
  font-size: 36px;
  top: -50px;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -50px;
`;

const DetailInfo = styled.div`
  line-height: 1.2;

  span {
    display: block;
    a {
      color: "inherit";
      text-decoration: "none";
    }
  }
`;
const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,

    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};
interface IMoviesList {
  queryFn: () => Promise<IGetMoviesResult>;
  queryKey: [string, string];
}

function MoviesList({ queryKey, queryFn }: IMoviesList) {
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey,
    queryFn,
    enabled: !useRouteMatch("/movies/:movieId"),
  });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const location = useLocation();

  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    `${location.pathname.split("/movies")[0]}/movies/:movieId`
  );

  const { data: movieDetail, isLoading: isMovieDetailLoading } =
    useQuery(
      ["movieDetail", bigMovieMatch?.params.movieId],
      () => getMovie(bigMovieMatch?.params.movieId + ""),
      { enabled: !!bigMovieMatch?.params.movieId }
    );
  const history = useHistory();
  const { scrollY } = useScroll();

  const offset = 6;
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  console.log(data, isLoading);
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onBoxClicked = (movieId: number) => {
    const basePath = location.pathname.split("/movies")[0] || "/"; // 기본 경로 가져오기
    if (basePath === "/") {
      history.push(`/movies/${movieId}`);
    } else {
      history.push(`${basePath}/movies/${movieId}`);
    }
    console.log(`BasePath :${basePath}`);
  };

  const onOverlayClicked = () => {
    history.goBack();
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );
  console.log(clickedMovie);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeBgPath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariants}
                      initial="normal"
                      key={movie.id}
                      whileHover="hover"
                      transition={{ type: "tween" }}
                    >
                      <Img
                        bgPhoto={makeImagePath(movie.backdrop_path)}
                      />
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />

                {/* <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>
                        {clickedMovie.overview}
                        <hr />
                        {isMovieDetailLoading ? (
                          "Loading"
                        ) : (
                          <>
                            <DetailInfo>
                              <span>
                                Budget: $
                                {(+movieDetail.budget).toLocaleString()}
                              </span>

                              <span>
                                Revenue: ${" "}
                                {(+movieDetail.revenue).toLocaleString()}
                              </span>

                              <span>
                                Runtime:
                                {movieDetail.runtime} minutes
                              </span>

                              <span>
                                {" "}
                                Rating:
                                {movieDetail.vote_average.toFixed(1)}
                              </span>

                              <span>
                                Homepage:
                                <a
                                  href={movieDetail.homepage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {movieDetail.homepage}
                                </a>
                              </span>
                            </DetailInfo>
                          </>
                        )}
                      </BigOverview>
                    </>
                  )}
                </BigMovie> */}
                <MovieDetail
                  clickedMovie={clickedMovie}
                  movieDetail={movieDetail}
                  isMovieDetailLoading={isMovieDetailLoading}
                  scrollY={scrollY}
                />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default MoviesList;
