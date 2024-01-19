import { useState } from "react";
import * as math from "https://esm.sh/mathjs";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("0");

  const handleDecimal = () => {
    const lastNumber = input.split(/[\+\-\*/]/).pop();
    if (!lastNumber.includes(".")) {
      setInput((prevInput) => prevInput + ".");
    }
  };

  const handleClick = (value) => {
    if (input === "Error") {
      setInput("0");
      return;
    }

    const lastChar = input[input.length - 1];

    if (value === "(" || value === ")") {
      setInput((prevInput) => prevInput + value);
    } else if (/[\+\*//*.]/.test(value)) {
      if (value === "-" && (input === "0" || /[\+\*/.]/.test(lastChar))) {
        setInput((prevInput) => prevInput + value);
      } else {
        setInput((prevInput) => {
          const withoutConsecutiveOperators = prevInput.replace(
            /[\+\*/-]+\s*$/, ""
          );
          return withoutConsecutiveOperators + value;
        });
      }
    } else {
      setInput((prevInput) => (prevInput === "0" ? value : prevInput + value));
    }
  };
  

  const handleCalculate = () => {
    try {
      const result = math.evaluate(input);
      setInput(String(result));
    } catch (error) {
      setInput("Error");
    }
  };

  const handleClear = () => {
    setInput("0");
  };

  return (
    <div>
      <h1 className="Calculator">Calculator</h1>
      <div className="contain-calculator">
        <div id="display">{input}</div>
        <div className="btn">
          <button id="seven" onClick={() => handleClick("7")}>
            7
          </button>
          <button id="eight" onClick={() => handleClick("8")}>
            8
          </button>
          <button id="nine" onClick={() => handleClick("9")}>
            9
          </button>
          <button id="divide" onClick={() => handleClick("/")}>
            /
          </button>

          <button id="four" onClick={() => handleClick("4")}>
            4
          </button>
          <button id="five" onClick={() => handleClick("5")}>
            5
          </button>
          <button id="six" onClick={() => handleClick("6")}>
            6
          </button>
          <button id="multiply" onClick={() => handleClick("*")}>
            *
          </button>

          <button id="one" onClick={() => handleClick("1")}>
            1
          </button>
          <button id="two" onClick={() => handleClick("2")}>
            2
          </button>
          <button id="three" onClick={() => handleClick("3")}>
            3
          </button>
          <button id="subtract" onClick={() => handleClick("-")}>
            -
          </button>

          <button id="zero" onClick={() => handleClick("0")}>
            0
          </button>
          <button id="decimal" onClick={handleDecimal}>
            .
          </button>
          <button id="equals" onClick={handleCalculate}>
            =
          </button>
          <button id="add" onClick={() => handleClick("+")}>
            +
          </button>

          <button id="clear" onClick={handleClear}>
            AC
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
