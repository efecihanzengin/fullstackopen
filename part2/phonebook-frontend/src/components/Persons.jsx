const Persons = ({ persons, filterWord, deletePerson }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().startsWith(filterWord))
        .map((person) => {
          return (
            <p key={person.id}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id)}>delete</button>
            </p>
          );
        })}
    </div>
  );
}

export default Persons


