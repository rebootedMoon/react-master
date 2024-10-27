import { useQuery } from "react-query";
import { fetchCharacters } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ICharacter {
  id: string;
  name: string;
  imageUrl: string;
}

const Container = styled.div`
  padding: 20px 20px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-family: "waltograph";
  font-size: 48px;
  font-weight: 800;
`;
const CharacterOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
`;

const Character = styled.div`
  margin-bottom: 30px;
  position: relative;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    position: relative;
  }
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }
`;
const Loader = styled.span`
  text-align: center;
`;
export default function Home() {
  const { isLoading, data } = useQuery<ICharacter[]>(
    "disney characters",
    fetchCharacters
  );
  console.log(data);
  return (
    <Container>
      <Header>
        <Title> Disney Characters </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <CharacterOverview>
          {data?.slice(0, 100).map((character) =>
            character.imageUrl ? (
              <Character key={character.id}>
                <Link
                  to={{
                    pathname: `/character/${character.id}`,
                    state: {
                      name: character.name,
                      imageUrl: character.imageUrl,
                    },
                  }}
                >
                  <Img src={character.imageUrl} />
                  <span> {character.name}</span>
                </Link>
              </Character>
            ) : null
          )}
        </CharacterOverview>
      )}
    </Container>
  );
}
