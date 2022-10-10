//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { field, cl, initialization } from './script.js';



let compArray = [1, 2, 3, 4];
//cl('start')
initialization(10, 10, 10)

//console.table(field[0])

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

function Cell({ item }) {

  function handleClick(e) {

    e.preventDefault();

    if (e.type === "click") {
      console.log("Left click", e.target);


    } else if (e.type === "contextmenu") {
      console.log("Right click", e.target);
    }
    // console.log('You clicked submit.', status);
    //setStatus(!status);

  }

  return (
    <div
      //key={item.indexCounter}
      className={'cell' + ( item.show ? " show" : "")}
      cellId={item.id}
      onClick={handleClick} onContextMenu={handleClick}
    >
      {item.id}
    </div>
  )
}
function Field() {
  //  [field, setField] = useState(field);

  return <div className='field_wrapper'>
    {field.map((row) => (
      <div className='row'>
        {row.map((item) => {
          //Cell(item)
          return <Cell key={item.id} item={item} />
        })}
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
  const [title, setTitle] = useState("Default Title");
  //setTitle()
  return (

    <div className="App">

      <header className="App-header">
        <Field />

        {
          //compArray.map((item) => (
          //  <div>component {item}</div>
          //))
        }

        {
          //   <Example/>
          // <Form/>
        }
      </header>
    </div>
  );
}

export default App;
