import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home">
      <h1>
        Welcome to our Memory Card Game! Our game offers different difficulty
        levels and other great features like statistics and history!
      </h1>

      <span className="play-now">
        <h2>Try it now for free!</h2>
        <Link to="/play" className="btn play-now-btn">
          Play Now!
        </Link>
      </span>
    </section>
  );
};

export default Home;
