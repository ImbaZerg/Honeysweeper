// npm start
// https://honeysweeper.konstantinshiev.repl.co/
// lottie
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { cl, initialization, getMatrix, getNormalizedObject, } from './script.js';
import { Field, Modal, Menu } from './components';


export default function App() {

  /* 
  useEffect(() => {
     return () => {
       document.title = "prevTitleRef.current";
     };
   }, []);
 */
  const [gameRunning, setGameRunning] = useState(true);
  let [mineCount, setMineCount] = useState(5);
  let [defaultMineCount, setDefaultMineCount] = useState(5);
  let [height, setheight] = useState(4);
  let [width, setWidth] = useState(12);

  const [matrix, setMatrix] = useState(() => getMatrix(height, width));

  const [normalized, setNormalized] = useState(() => getNormalizedObject(matrix, mineCount));


  //setTitle()
  // console.table(matrix[2])
  function setCell(item) {
    setNormalized((normalized) => ({
      ...normalized,
      [item.id]: item,
    }));
  }

  /* const handleMouseDownUp = useCallback(function 
    (item, e) {
      console.log('MEMEMEM', e.type);
      return;
    },[]
  ) */

  function handleMouseDown(item, e) {
    console.log('handleMouseDown', e.type, e.button);
    if (e.button !== 0) {
      return
    }

    if (item.show === true && item.number > 0) {

      let markedMines = item.surrounding.reduce((sum, sibling) =>
        sum + normalized[sibling].flag, 0
      )

      if (item.number === markedMines) {
        console.log('show')

        item.surrounding.map((cursor) => {
          if (!normalized[cursor].flag) {

            setCell({ ...normalized[cursor], show: true })

            if (normalized[cursor].mine) {
              setGameRunning(false);
            }
          }
        })

      } else {
        console.log('hilight')

      }

    }


  }

  function handleMouseUp(item, e) {
    console.log('handleMouseUp', e.type, e);
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
      console.log("Left click", e.target);
      if (item.number === 0 && !item.mine) {
        let spreadArr = [item.id];
        spread(spreadArr, item);

        spreadArr.map((cursor) => {
          if (normalized[cursor].flag) {
            console.log("mineCount", mineCount);
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
      console.log("Right click", e.target);
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


  const restart = () => {

    setMatrix(() => getMatrix(height, width))
    console.log('mineCount',  mineCount, defaultMineCount);
    setMineCount(defaultMineCount);
    console.log('mineCount',  mineCount, defaultMineCount);

    setNormalized(() => getNormalizedObject(matrix, mineCount))
    setGameRunning(true)

  }

  function spread(spreadArr, item) {

    for (let poten in item.surrounding) {

      let cursor = item.surrounding[poten];

      if (spreadArr.indexOf(cursor) < 0) {
        spreadArr.push(cursor);
        //console.log('cursor.number ', normalized[cursor].number, cursor)

        if (normalized[cursor].number === 0) {
          spread(spreadArr, normalized[cursor]);
        }
      }


    }

    return spreadArr;


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


