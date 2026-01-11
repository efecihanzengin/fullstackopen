import { useState } from "react";

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const randomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const vote = (index) => {
    const copy = [...votes];
    copy[index] += 1;
    setVotes(copy);
  };

  let maxVoted = votes.indexOf(Math.max(...votes));
  console.log(maxVoted);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button
        name="next anecdote"
        onClick={() => setSelected(randomNumber(anecdotes))}
      />
      <Button name="vote" onClick={() => vote(selected)} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVoted]}</p>
    </div>
  );
};

export default App;
