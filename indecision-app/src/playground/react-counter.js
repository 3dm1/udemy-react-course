let count = 0;
const increment = () => {
  count++;
  renderCounterApp();
}
const decrement = () => {
  count--;
  renderCounterApp();
}
const reset = () => {
  count = 0;
  renderCounterApp();
}

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={increment}>+1</button>
    <button onClick={decrement}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);

const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
  ReactDOM.render(templateTwo, appRoot);
};

renderCounterApp();
