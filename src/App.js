import React from "react";

import "./styles.css";
import logo from "./images/logo.png";

function CharacterCard(props) {
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
}

class App extends React.Component {
  constructor(props) {
    console.log("1.constructor()");
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: {
        info: {},
        results: [],
      },
      nextPage: 1,
    };
  }

  componentDidMount() {
    console.log("3.componentDidMount()");
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("5.componentDidUpdate()");
    console.log({
      prevProps,
      prevState,
    });
    console.log({
      props: this.props,
      state: this.state,
    });
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
      );
      const data = await response.json();
      console.log("peticion");
      this.setState({
        loading: false,
        data: {
          info: data.info,
          // results: [].concat(this.state.data.results, data.results),
          results: [...this.state.data.results, ...data.results],
        },
        nextPage: this.state.nextPage + 1,
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    console.log(`2/4.render() -> data: ${this.state.data.results.length}`);
    if (this.state.error) {
      return "Error!";
    }

    return (
      <div className="container">
        <div className="App">
          <img className="Logo" src={logo} alt="Rick y Morty" />

          <ul className="row">
            {this.state.data.results.map((character) => (
              <li className="col-6 col-md-3" key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>

          {this.state.loading && <div className="lds-dual-ring"></div>}

          {!this.state.loading && this.state.data.info.next && (
            <button onClick={() => this.fetchCharacters()}>Load More</button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
