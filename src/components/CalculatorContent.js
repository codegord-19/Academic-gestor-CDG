import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import '../styles/Calc.css';
import Backcalc from './backcalc';



function CalculatorContent() {
  const [input, setInput] = useState('');

  const display = (value) => {
    setInput(input + value);
  };

  const clearScreen = () => {
    setInput('');
  };

  const backspace = () => {
    setInput(input.slice(0, -1));
  };

  const solve = () => {
    let result = input;
    result = result.replace(/√\(([^)]+)\)/g, 'sqrt($1)');
    result = result.replace(/(\d+)\^(\d+)/g, '($1)^($2)');
    result = result.replace(/(\d+)%/g, '($1/100)');
    try {
      const evaluatedResult = evaluate(result);
      setInput(String(evaluatedResult));
    } catch (e) {
      setInput("Error");
    }
  };

  const calculate = (operator) => {
    setInput(input + operator);
  };

  return (
     <div className='calcu'>
        <div className='title1'>
            <h2 className="animate__animated animate__fadeIn">Calculadora</h2>
            <i class="fa-solid fa-calculator"></i>
        </div>
        <div className='calc'>
            <div className="calculadora">
              <input type="text" className="pantalla" value={input} disabled />
              <div className="p1"><p>Code-Gord19</p></div>
              <div className="botones">
                  <button onClick={() => display('(')}>(</button>
                  <button onClick={() => display(')')}>)</button>
                  <button onClick={() => calculate('%')}>%</button>
                  <button onClick={clearScreen}>C</button>
                  <button onClick={() => display('1')}>1</button>
                  <button onClick={() => display('2')}>2</button>
                  <button onClick={() => display('3')}>3</button>
                  <button onClick={() => calculate('/')}>÷</button>
                  <button onClick={() => display('4')}>4</button>
                  <button onClick={() => display('5')}>5</button>
                  <button onClick={() => display('6')}>6</button>
                  <button onClick={() => calculate('-')}>−</button>
                  <button onClick={() => display('7')}>7</button>
                  <button onClick={() => display('8')}>8</button>
                  <button onClick={() => display('9')}>9</button>
                  <button onClick={() => calculate('*')}>×</button>
                  <button onClick={() => calculate('√(')}>√</button> {/* Se adapta para usar con la lógica de solve */}
                  <button onClick={() => display('.')}>.</button>
                  <button onClick={() => display('0')}>0</button>
                  <button onClick={() => calculate('+')}>+</button>
                  <button onClick={() => calculate('^')}>^</button> {/* Se adapta para usar con la lógica de solve */}
                  <button onClick={backspace}>←</button>
                  <button onClick={solve} className="igual">=</button>
            </div>
        </div>
        </div>
      </div>
  );

}
  
export default CalculatorContent;
  