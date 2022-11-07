import { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    console.log("constructor");
    super(); //calls the constructor of whatever this current class is extending from

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            //console.log(this.state);
          }
        )
      );
  }

  //moved to it's own function for optimization
  onSearchChange = (event) => {
    //FILTER IS CASE SENSITIVE
    const searchField = event.target.value.toLowerCase(); //have to lower case it so for filter
    this.setState(() => {
      return { searchField };
    });
  }

  render() {
    console.log("render");

    const {monsters, searchField} = this.state; //cast things to variables
    const {onSearchChange} = this; //cast to variable to make useage shorter later

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search monsters"
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
