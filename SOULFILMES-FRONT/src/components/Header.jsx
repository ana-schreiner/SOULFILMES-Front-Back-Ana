import logo from "./../assets/icon.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header w-100 px-3 py-2">
      <nav className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <img
            src={logo}
            width="80"
            height="80"
            className="logo"
            alt="Logo"
          />
        </Link>
        <div className="d-flex gap-5">
          <Link to="/usuarios">Usuários</Link>
          <Link to="/filmes">Filmes</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
