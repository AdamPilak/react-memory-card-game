import { Logs } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
  }, [location]);

  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          MemoryCardGame
        </Link>
        <div className={`nav-links ${isVisible ? "visible" : "hidden"}`}>
          <Link className="nav-link" to="/play">
            PLAY
          </Link>
          <Link className="nav-link" to="/history">
            HISTORY
          </Link>
        </div>
        <button
          className="menu-btn"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          <Logs />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
