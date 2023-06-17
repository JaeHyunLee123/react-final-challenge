import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse } from "../api";
import styled from "styled-components";
import MovieList from "../Components/MovieList";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.black.darker};
`;

const Home = () => {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
  );

  return (
    <Wrapper>{isLoading ? null : <MovieList movies={data?.results} />}</Wrapper>
  );
};

export default Home;
