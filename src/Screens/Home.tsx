import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse, makeBgPath, makeImagePath } from "../api";
import MovieDetail from "../Components/MoiveDetail";
import styled from "styled-components";

const MovieBox = styled.div``;

const Home = () => {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
  );

  return (
    <>
      <h1>Popular</h1>
      {isLoading ? null : (
        <>
          <MovieDetail movieid={data?.results[4].id} />
          {data?.results.map((movie) => (
            <MovieBox>
              <img src={`${makeImagePath(movie.backdrop_path)}`} />
              <h3>{movie.title}</h3>
            </MovieBox>
          ))}
        </>
      )}
    </>
  );
};

export default Home;
