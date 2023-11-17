import React, { useState, useEffect } from "react";

const Calculator = () => {
  // Initialize state with values from localStorage or default to empty strings
  const [value1, setValue1] = useState<string>(
    localStorage.getItem("value1") || ""
  );
  const [value2, setValue2] = useState<string>(
    localStorage.getItem("value2") || ""
  );
  const [value3, setValue3] = useState<string>(
    localStorage.getItem("value3") || ""
  );
  const [result, setResult] = useState<number>(0);

  // Update localStorage whenever the values change
  useEffect(() => {
    localStorage.setItem("value1", value1);
    localStorage.setItem("value2", value2);
    localStorage.setItem("value3", value3);
  }, [value1, value2, value3]);

  // Function to handle the calculation
  const handleCalculation = () => {
    const num1 = parseFloat(value1) || 0;
    const num2 = parseFloat(value2) || 0;
    const num3 = parseFloat(value3) || 0;
    const sum = num1 + num2;
    setResult(sum - num3);
  };

  return (
    <div>
      <div>
        <img src="https://weekendrvers.com/wp-content/uploads/2023/11/WRVers-Logo-Small.png"></img>
        <h2>Towing Calculator</h2>
      </div>
      <label>
        Value 1:
        <input
          type="number"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
      </label>
      <br />
      <label>
        Value 2:
        <input
          type="number"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
      </label>
      <br />
      <label>
        Subtract Value:
        <input
          type="number"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCalculation}>Calculate</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default Calculator;
