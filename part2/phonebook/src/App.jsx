import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import SearchFilter from "./components/SearchFilter";
import Persons from "./components/Persons";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson);
      });
  }, []);

    const addPerson = (e) => {
        e.preventDefault();
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const nameObject = {
                name: newName,
                id: persons.length + 1,
                number: newNumber,
            };
            personService
                .create(nameObject)
                .then(initialPerson => {
                    setPersons(persons.concat(initialPerson))
                    setNewName("");
                })
        }
    };

    const deletePerson = (id) => {
        personService
            .deletePerson(id)
            .then(() => {
                setPersons(persons.filter(n => n.id !== id))
            })
    }

  const handlePersonChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterWord(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={filterWord} onChange={handleFilterChange} />

      <h3>Add new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filterWord={filterWord}
        deletePerson={deletePerson} />
    </div>
  );
};

export default App;
