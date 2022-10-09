//import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
function cl(item) { return console.log(item) }
let componentCount = 5;

let compArray = [1, 2, 3, 4];

let width = 10;
let height = 10;

let field = [];
let indexCounter = 0;
for (let i = 0; i < height; i++) {

  let row = [];
  for (let j = 0; j < width; j++) {
    row.push({
      index: indexCounter
    })
    indexCounter++

  }

  field.push(row)

}
console.log('start')

console.table(field[0])
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}



function Field() {
  return <div class='field_wrapper'>
    {field.map((row) => (
      <div class='row'>
        {row.map((item)=>(<div class ='cell' >{item.index}</div>))}
      </div>
    ))}
  </div>
}

function Form() {
  //let status = true;
  let [status, setStatus] = useState(true);
  function handleClick(e) {
    e.preventDefault();


    if (e.type === "click" && e.type === "contextmenu") {
      console.log("Both click");
    }

    if (e.type === "click") {
      console.log("Left click");
    } else if (e.type === "contextmenu") {
      console.log("Right click");
    }
    console.log('You clicked submit.', status);
    setStatus(!status);
  }

  return (
    <div >
      <button onClick={handleClick} onContextMenu={handleClick}
        type="submit">
        {status ? "check" : "unchek"}
      </button>
    </div>
  );
}
function App() {

  return (
    <div className="App">
      <header className="App-header">
        { Field()}{

          compArray.map((item) => (
            <div>component {item}</div>
          ))}
        {
          Example()}{
          Form()
        }
      </header>
    </div>
  );
}

export default App;
