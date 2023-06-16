import styled from "styled-components";
import { makeBgPath, getMovie, IMovieDetail } from "../api";
import { useQuery } from "@tanstack/react-query";

const Wrapper = styled.div<{ bgphoto: string }>`
  width: 80vw;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

interface IProp {
  movieid: number | undefined;
}

const MovieDetail = ({ movieid = 0 }: IProp) => {
  const { data, isLoading } = useQuery<IMovieDetail>(
    ["movie-detail", movieid],
    () => getMovie(movieid.toString())
  );

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <Wrapper bgphoto={makeBgPath(data?.backdrop_path || "")}>
          <h1>{data?.title}</h1>
          <p>{data?.overview}</p>
          <span>Budget: ${data?.budget}</span>
          <span>Revenue: ${data?.revenue}</span>
          <span>Runtime: {data?.runtime} minutes</span>
          <span>Rating: {data?.vote_average}</span>
          <span>Homepage: {data?.homepage}</span>
        </Wrapper>
      )}
    </>
  );
};

export default MovieDetail;
