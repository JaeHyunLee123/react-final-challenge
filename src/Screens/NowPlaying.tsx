import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, IAPIResponse, makeImagePath } from "../api";

const NowPlaying = () => {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "now-playing"],
    getNowPlaying
  );

  return (
    <>
      <h1>Now playing</h1>
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

export default NowPlaying;
