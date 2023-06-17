import { useQuery } from "@tanstack/react-query";
import { getComingSoon, IAPIResponse } from "../api";
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

const ComingSoon = () => {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "comming-soon"],
    getComingSoon
  );

  return (
    <Wrapper>{isLoading ? null : <MovieList movies={data?.results} />}</Wrapper>
  );
};

export default ComingSoon;
