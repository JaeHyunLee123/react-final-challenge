import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 75px;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.black.darker};
`;

const Item = styled.li`
  color: ${(props) => props.theme.white.darker};
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  a:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
  bottom: -15px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Header = () => {
  const homeMatch = useMatch("/");
  const commingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");

  return (
    <Nav>
      <Item>
        <Link to="/">POPULAR</Link>
        {homeMatch ? <Circle layoutId="circle" /> : null}
      </Item>
      <Item>
        <Link to="/coming-soon">COMING SOON</Link>
        {commingSoonMatch ? <Circle layoutId="circle" /> : null}
      </Item>
      <Item>
        <Link to="/now-playing">NOW PLAYING</Link>
        {nowPlayingMatch ? <Circle layoutId="circle" /> : null}
      </Item>
    </Nav>
  );
};

export default Header;
