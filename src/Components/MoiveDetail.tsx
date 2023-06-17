import styled from "styled-components";
import { makeBgPath, getMovie, IMovieDetail } from "../api";
import { useQuery } from "@tanstack/react-query";

const Wrapper = styled.div<{ bgphoto: string }>`
  width: 600px;
  height: 800px;
  color: ${(props) => props.theme.white.lighter};
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 30px;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: linear-gradient(rgba(0, 0, 0, 0), #2f2f2f),
    url(${(props) => props.bgphoto});
  background-position: center top;
  background-size: 100% 50%;
  background-repeat: no-repeat;
  h1 {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  p {
    margin-bottom: 10px;
  }
  span:last-child {
    margin-bottom: 50px;
  }
`;

interface IProp {
  movieid: number | undefined;
}

const MovieDetail = ({ movieid = 0 }: IProp) => {
  const { data, isLoading } = useQuery<IMovieDetail>(
    ["movie-detail", movieid],
    () => getMovie(movieid.toString())
  );

  const budget = data?.budget.toLocaleString();
  const revenue = data?.revenue.toLocaleString();
  const rating = data?.vote_average.toFixed(2);

  return (
    <div>
      {isLoading ? null : (
        <Wrapper bgphoto={makeBgPath(data?.backdrop_path || "")}>
          <h1>{data?.title}</h1>
          <p>{data?.overview}</p>
          <span>Budget: ${budget}</span>
          <span>Revenue: ${revenue}</span>
          <span>Runtime: {data?.runtime} minutes</span>
          <span>Rating: {rating}</span>
          <span>
            Homepage: <a href={`${data?.homepage}`}>{data?.homepage}</a>
          </span>
        </Wrapper>
      )}
    </div>
  );
};

export default MovieDetail;
