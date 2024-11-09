import styled from "styled-components";
import { makeImagePath } from "../api";
import { motion } from "framer-motion";

interface MovieDetailProps {
  clickedMovie: any;
  movieDetail: any;
  isMovieDetailLoading: boolean;
  scrollY: any;
}
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
function MovieDetail({
  clickedMovie,
  movieDetail,
  isMovieDetailLoading,
  scrollY,
}: MovieDetailProps) {
  return (
    <BigMovie
      style={{ top: scrollY.get() + 100 }}
      layoutId={clickedMovie?.id}
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
                    Budget: ${(+movieDetail.budget).toLocaleString()}
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
    </BigMovie>
  );
}

export default MovieDetail;
