import { Logs } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          MemoryCardGame
        </Link>
        <div className="nav-links">
          <Link className="nav-link" to="/play">
            PLAY
          </Link>
          {/* <Link className="nav-link" to="/play">
          STATISTICS
        </Link> */}
          <Link className="nav-link" to="/play">
            HISTORY
          </Link>
        </div>
        <button className="menu-btn">
          <Logs />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
