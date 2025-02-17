import { useState } from 'react';
import Todolist from "./assets/components/todolist";

function App() {
  
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  function reset() {
    setCount(0);
  }

  // Start with two inputs: num1 and num2
  const [inputs, setInputs] = useState([{ num: '' }, { num: '' }]);

  const handleCalculation = (operation) => {
    const newInputs = [...inputs];
    const numbers = newInputs.map(input => parseFloat(input.num));

    // Check if any number is invalid
    if (numbers.some(num => isNaN(num))) {
      return;
    }

    let result;
    switch (operation) {
      case '+':
        result = numbers.reduce((acc, curr) => acc + curr, 0);
        break;
      case '-':
        result = numbers.reduce((acc, curr) => acc - curr);
        break;
      case '*':
        result = numbers.reduce((acc, curr) => acc * curr, 1);
        break;
      case '/':
        if (numbers.includes(0)) {
          result = 'Cannot divide by zero';
        } else {
          result = numbers.reduce((acc, curr) => acc / curr);
        }
        break;
      default:
        break;
    }

    setInputs(newInputs.map(input => ({ ...input, result })));
  };

  const handleAddInput = () => {
    setInputs([...inputs, { num: '' }]);
  };

  const handleChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].num = e.target.value;
    setInputs(newInputs);
  };

  return (
    <main>
      <div className="container">
        
        {/* Increment Section */}
        <div className="counter-section">
          <h1>Number: {count}</h1>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </div>

        {/* Calculator Section */}
        <div className="calculator-section">
          <h2>Calculator</h2>
          <button onClick={handleAddInput}>Add Input</button>

          {/* Start with two input fields (num1, num2) */}
          {inputs.map((input, index) => (
            <div key={index} className="input-group">
              <input
                type="number"
                value={input.num}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Number ${index + 1}`}
              />
            </div>
          ))}

          <div className="operation-buttons">
            <button onClick={() => handleCalculation('+')}>+</button>
            <button onClick={() => handleCalculation('-')}>-</button>
            <button onClick={() => handleCalculation('*')}>*</button>
            <button onClick={() => handleCalculation('/')}>/</button>
          </div>

          <div className="result">
            Result: {inputs[0].result} {/* Display the result */}
          </div>
        </div>

        <div>
          <Todolist />
        </div>
      </div>
    </main>
  );
}

export default App;
