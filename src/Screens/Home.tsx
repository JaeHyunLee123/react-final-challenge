import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse, makeImagePath } from "../api";

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

export default Home;
