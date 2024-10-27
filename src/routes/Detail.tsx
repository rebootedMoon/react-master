import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchDetailCharacter } from "../api";
import styled from "styled-components";

interface RouteParams {
  id: string;
}
interface RouteState {
  name: string;
  imageUrl: string;
}
interface ICharacter {
  id: string;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}

const Container = styled.div`
  padding: 20px 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: Column;
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-size: 32px;
`;

const Img = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  margin-bottom: 20px;
  margin-top: 20px;
  object-fit: cover;
`;
const Loader = styled.span`
  text-align: center;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
`;
const Film = styled.span`
  background-color: white;
  color: black;
  margin: 5px 5px;
  padding: 6px 10px;
  border-radius: 10px;
`;
export default function Detail() {
  const { id } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const { isLoading, data } = useQuery<ICharacter>(
    "chracter Detail",
    () => fetchDetailCharacter(id)
  );
  console.log("data", data);
  console.log(state);

  return (
    <Container>
      {state ? (
        <Header>
          <Link to={"/"}> &larr; </Link>
          <Img src={state.imageUrl} />
          <Title>{state.name}'s Films</Title>
        </Header>
      ) : isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Header>
          <Img src={data?.imageUrl} />
          <Title>{data?.name}'s Films</Title>
        </Header>
      )}
      <DetailInfo>
        {data?.films.map((film) => (
          <Film key={film}>{film}</Film>
        ))}
      </DetailInfo>
    </Container>
  );
}
