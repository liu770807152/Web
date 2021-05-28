import React, { Component } from "react";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import { addPersonAction } from "../../Redux/actions/person";

class Person extends Component {
  addPerson = () => {
    const personObj = {
      id: nanoid(),
      name: this.nameNode.value,
      age: this.ageNode.value,
    };
    this.props.addPerson(personObj);
  };

  render() {
    return (
      <div>
        <h1>The sum above is: {this.props.sum}</h1>
        <input
          ref={(c) => {
            this.nameNode = c;
          }}
          type="text"
          placeholder="type in name"
        />
        <input
          ref={(c) => {
            this.ageNode = c;
          }}
          type="text"
          placeholder="type in age"
        />
        <button onClick={this.addPerson}>add</button>
        <ul>
          {this.props.persons.map((person) => {
            return person.id !== "" ? (
              <li key={person.id}>
                {person.name} -- {person.age}
              </li>
            ) : (
              ""
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  persons: state.persons,
  sum: state.sum,
});

const mapDispatchToProps = {
  addPerson: addPersonAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
