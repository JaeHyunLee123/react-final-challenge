import { useQuery } from "@tanstack/react-query";
import { getComingSoon, IAPIResponse, makeImagePath } from "../api";

const ComingSoon = () => {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "comming-soon"],
    getComingSoon
  );

  return (
    <>
      <h1>Coming Soon</h1>
      {isLoading ? null : (
        <>
          {data?.results.map((movie) => (
            <>
              <img src={`${makeImagePath(movie.backdrop_path)}`} />
              <h3>{movie.title}</h3>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default ComingSoon;
