import { useState } from "react";

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / (good + bad + neutral);
  const positive = (good * 100) / (good + neutral + bad) + " %";

  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>no feedback given</p>;
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine name="good" props={good} />
          <StatisticLine name="neural" props={neutral} />
          <StatisticLine name="bad" props={bad} />
          <StatisticLine name="all" props={all} />
          <StatisticLine name="average" props={average} />
          <StatisticLine name="positive" props={positive} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ props, name }) => {
  console.log(props, name);
  return (
    <tr>
      <td>{name}</td>
      <td>{props}</td>
    </tr>
  );
};

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>{name}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} name="good" />
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral" />
      <Button onClick={() => setBad(bad + 1)} name="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
