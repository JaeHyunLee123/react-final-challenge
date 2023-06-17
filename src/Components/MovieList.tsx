import { IMovie, makeImagePath } from "../api";
import MovieDetail from "./MoiveDetail";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  bottom: ${(window.innerHeight - 800) / 2}px;
`;

const Button = styled(motion.button)`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.906);
  right: ${(window.innerWidth - 600) / 2}px;
  top: ${(window.innerHeight - 800) / 2 + 20}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IProp {
  movies: IMovie[] | undefined;
}

const MovieList = ({ movies }: IProp) => {
  const [boxId, setBoxId] = useState<number | null>(null);
  return (
    <>
      <Movies>
        {movies?.map((movie, index) => {
          return (
            <MovieBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.15 }}
              key={movie.id}
            >
              {index === boxId ? null : (
                <Image
                  onClick={() => setBoxId(index)}
                  whileHover={{ y: -15 }}
                  src={`${makeImagePath(movie.backdrop_path)}`}
                  layoutId={`${index}`}
                />
              )}
              <span>{index === boxId ? "" : movie.title}</span>
            </MovieBox>
          );
        })}
      </Movies>
      <AnimatePresence>
        {boxId !== null ? (
          <Overlay layoutId={`${boxId}`}>
            <Button
              onClick={() => setBoxId(null)}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.5 } }}
              exit={{ scale: 0, transition: { duration: 0 } }}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </Button>
            <MovieDetail movieid={movies?.[boxId].id}></MovieDetail>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default MovieList;
