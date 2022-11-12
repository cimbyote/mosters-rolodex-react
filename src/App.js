import { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

class App extends Component {
  constructor() {
    super(); //calls the constructor of whatever this current class is extending from

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
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
    const {monsters, searchField} = this.state; //cast things to variables
    const {onSearchChange} = this; //cast to variable to make useage shorter later

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>

        <SearchBox className = {"monsters-search-box"} onChangeHandler={onSearchChange} placeholder={"Search Monsters"}/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
