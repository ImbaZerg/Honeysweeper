//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { cl, initialization, getMatrix, getNormalizedObject, } from './script.js';
import { Field } from './components';


let compArray = [1, 2, 3, 4];
//cl('start')
//initialization(6, 10, 10)



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

  const [matrix, setMatrix] = useState(() => getMatrix(6, 10));
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

    // google spread operator
    const showCell = { ...item, show: !item.show, flag: false };
    const makrMine = { ...item, flag: !item.flag };



    if (!item.active) {
      return
    }

    if (e.type === "click") {
      console.log("Left click", e.target);
      if(item.number === 0 ){
        let spred = [];

        for(let poten in item.surrounding){

          spred.push(item.surrounding[poten])
        }

        spread(spred);


        
      } else {
        setCell(showCell);
      }
    

    } else if (e.type === "contextmenu") {
      console.log("Right click", e.target);
      funMakrMine();

      if (e.shiftKey) {
        console.debug("Ctrl+click has just happened!");

        for (let sib of normalized[item.id].surrounding) {
          cl(sib)
          const showSib = { ...normalized[sib], show: !normalized[sib].show }
          cl(showSib)
          setCell(showSib);
        }
      }
    }
    // console.log('You clicked submit.', status);
    //setStatus(!status);

    // перенести в scripts
    function spread (spread){

 
    }
    function setCell(item) {
      setNormalized((normalized) => ({
        ...normalized,
        [item.id]: item,
      }));
    }

    function funMakrMine() {
      if (!item.show && item.active) {
        setCell(makrMine)
      }

    }

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


