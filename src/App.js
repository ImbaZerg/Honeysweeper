// npm start
// https://honeysweeper.konstantinshiev.repl.co/
// lottie
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { cl, initialization } from './script.js';
import { Field, Modal, Menu } from './components';
//import { Minesweeper } from './minesweeper.js';
import Minesweeper from './minesweeper.js';



export default function App() {

  /* 
  useEffect(() => {
     return () => {
       document.title = "prevTitleRef.current";
     };
   }, []);
 */



  const [gameRunning, setGameRunning] = useState(true);
  const [defaultMineCount, setDefaultMineCount] = useState(5);
  const [mineCount, setMineCount] = useState(5);


  let [height, setheight] = useState(4);
  let [width, setWidth] = useState(12);

  const minesweeperClass = require('./minesweeper.js');
  let minesweeper = new Minesweeper(height, width, mineCount);
  console.log(minesweeper);

  const [matrix, setMatrix] = useState(() => minesweeper.matrix);

  const [normalized, setNormalized] = useState(() => minesweeper.normalizedObject);



  //setTitle()
  // console.table(matrix[2])


  /* const handleMouseDownUp = useCallback(function 
    (item, e) {
      console.log('MEMEMEM', e.type);
      return;
    },[]
  ) */

  function handleMouseDown(item, e) {
    minesweeper.handleMouseDown(item, e)

  }

  function handleMouseUp(item, e) {
    //console.log('handleMouseUp', e.type, e);
    if (e.button !== 0) {
      return
    }
  }


  function handleClick(item, e) {

    e.preventDefault();

    if (!item.active || !gameRunning) {
      return
    }

    // google spread operator
    const showCell = { ...item, show: true, flag: false };



    if (e.type === "click") {
      //console.log("Left click", e.target);
      if (item.number === 0 && !item.mine) {
        let spreadArr = [item.id];
        spread(spreadArr, item);

        spreadArr.map((cursor) => {
          if (normalized[cursor].flag) {
            //console.log("mineCount", mineCount);
            setMineCount((mineCount) => mineCount + 1)
          }
          setCell({ ...normalized[cursor], show: true, flag: false })
        })
      } else {
        setCell(showCell);
        if (item.mine === true) {
          setGameRunning(false)
        }
      }


    } else if (e.type === "contextmenu") {
      //console.log("Right click", e.target);
      funMakrMine(item);


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
  }
  // console.log('You clicked submit.', status);
  //setStatus(!status);

  // перенести в scripts

  function useConsoleWarn(name, value) {
    useEffect(() => {
      console.warn(`${name} ${value}`);
    }, [value]);
  }
  useConsoleWarn('mineCount', mineCount)

  const restart = () => {
    setMineCount(defaultMineCount);

    minesweeper = new Minesweeper(height, width, defaultMineCount)
    setMatrix(() => minesweeper.matrix)

    setNormalized(() => minesweeper.normalizedObject)
    minesweeper.gameRunning = true;

  }

  

  function setCell(item) {
    setNormalized((normalized) => ({
      ...normalized,
      [item.id]: item,
    }));
  }

  function funMakrMine(item) {
    const makrMine = { ...item, flag: !item.flag };

    if (!item.show && item.active) {

      !item.flag ? setMineCount(mineCount - 1) : setMineCount(mineCount + 1)
      setCell(makrMine)
    }

  }



  return (

    <div className="App">

      <header className="App-header">
        <Field {... {
          matrix,
          normalized,
          handleMouseDown,
          handleMouseUp,
          handleClick
        }}

        />
        <Menu mines={mineCount} restart={restart}></Menu>
        <Modal></Modal>
      </header>
    </div>
  );
}


