import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import SearchFilter from "./components/SearchFilter";
import Persons from "./components/Persons";
import personService from './services/persons'
import Notification from "./components/Notification";
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [isGreen, setIsGreen] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson);
      });
  }, []);

  const showMessage = (message, isSuccess = true) => {
    setIsGreen(isSuccess)
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage("")
    }, 5000)
  }

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(nameObject)
        .then(initialPerson => {
          setPersons(persons.concat(initialPerson))
          setNewName("")
          setNewNumber("")
          showMessage(`${initialPerson.name} added to phonebook`, true)
        })
    }
  };

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          setPersons(persons.filter(n => n.id !== id))
          showMessage(`${person.name} has already been removed from server`, false)
        })
    }
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
      <Notification message={errorMessage} isGreen={isGreen} />
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
