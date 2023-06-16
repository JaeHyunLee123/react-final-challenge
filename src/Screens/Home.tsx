import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse, makeImagePath } from "../api";
import MovieDetail from "../Components/MoiveDetail";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.black.darker};
`;

const Movies = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const MovieBox = styled(motion.div)`
  width: 200px;
  margin: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    text-align: center;
    font-size: 16px;
    height: 40px;
    color: ${(props) => props.theme.white.darker};
  }
`;

const Image = styled(motion.img)`
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 25px;
`;

const Home = () => {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
  );

  return (
    <Wrapper>
      {isLoading ? null : (
        <Movies>
          {data?.results.map((movie, index) => (
            <MovieBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.15 }}
              key={movie.id}
            >
              <Image
                whileHover={{ y: -15 }}
                src={`${makeImagePath(movie.backdrop_path)}`}
              />
              <span>{movie.title}</span>
            </MovieBox>
          ))}
        </Movies>
      )}
    </Wrapper>
  );
};

export default Home;
