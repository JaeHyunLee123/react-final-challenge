import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav>
      <Link to="/">POPULAR</Link>
      <Link to="/coming-soon">COMING SOON</Link>
      <Link to="/now-playing">NOW PLAYING</Link>
    </nav>
  );
};

export default Header;
