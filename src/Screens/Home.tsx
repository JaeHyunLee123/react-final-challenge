import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse, makeImagePath } from "../api";
import MovieDetail from "../Components/MoiveDetail";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Home = () => {
  const [boxId, setBoxId] = useState<number | null>(null);
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
              layoutId={`${index}`}
            >
              <Image
                onClick={() => setBoxId(index)}
                whileHover={{ y: -15 }}
                src={`${makeImagePath(movie.backdrop_path)}`}
              />
              <span>{movie.title}</span>
            </MovieBox>
          ))}
        </Movies>
      )}
      <AnimatePresence>
        {boxId !== null ? (
          <Overlay onClick={() => setBoxId(null)}>
            <MovieDetail movieid={data?.results[boxId].id}></MovieDetail>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Home;
