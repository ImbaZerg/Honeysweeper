//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { cl, initialization, getMatrix, getNormalizedObject } from './script.js';
import { Field} from './components';


let compArray = [1, 2, 3, 4];
//cl('start')
initialization(10, 10, 10)



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




function Form() {
  //let status = true;
  let [status, setStatus] = useState(true);
  function handleClick(item, e) {
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

export default function App() {

  /* 
  useEffect(() => {
     return () => {
       document.title = "prevTitleRef.current";
     };
   }, []);
 */

  const [matrix, setMatrix] = useState(() => getMatrix(10, 10));
  const [normalized, setNormalized] = useState(() => getNormalizedObject(matrix));
  const [title, setTitle] = useState("Default Title");
  //setTitle()
  // console.table(matrix[2])
  function setCell(item) {
    setNormalized((normalized) => ({
      ...normalized,
      [item.id]: item,
    }));
  }

  function handleClick(item, e) {

    e.preventDefault();

    if (!item.active) {
      return
    }

    if (e.type === "click") {
      console.log("Left click", e.target);

      // google spread operator
      const showCell = { ...item, show: !item.show };

      setCell(showCell);

    } else if (e.type === "contextmenu") {
      console.log("Right click", e.target);
    }
    // console.log('You clicked submit.', status);
    //setStatus(!status);

  }

  return (

    <div className="App">

      <header className="App-header">
        <Field matrix={matrix} normalized={normalized} handleClick={handleClick} />

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


