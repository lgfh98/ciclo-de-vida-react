import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "./images/logo.png";

const CharacterCard = (props) => {
  const { character } = props;

  return (
    <div
      className="CharacterCard"
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div className="CharacterCard__name-container text-truncate">
        {character.name}
      </div>
    </div>
  );
};

const AppHooks = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [nextPage, setNextPage] = useState(1);
  const [data, setData] = useState({ info: {}, results: [] });

  const fetchCharacters = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
      );
      const data = await response.json();
      console.log("peticion");
      setLoading(false);
      setData({ info: data.info, results: data.results });
      setNextPage(nextPage + 1);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [data.results]);

  if (error) {
    return "Error!";
  }

  return (
    <div className="container">
      <div className="App">
        <img className="Logo" src={logo} alt="Rick y Morty" />

        <ul className="row">
          {data.results.map((character) => (
            <li className="col-6 col-md-3" key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>

        {loading && <div className="lds-dual-ring"></div>}

        {!loading && data.info.next && (
          <button onClick={() => this.fetchCharacters()}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default AppHooks;
