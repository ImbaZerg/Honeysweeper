class Minesweeper {
  constructor(height, width, mines) {
    this.height = height;
    this.width = width;
    this.mines = mines;
    this.gameRunning = true;
    this.matrix = this.getMatrix(height, width);
    this.normalizedObject = this.getNormalizedObject(this.matrix, mines);

  }


  getMatrix(height, width) {

    let matrix = [];

    let indexCounter = 1;
    for (let y = 0; y < height + 2; y++) {

      let row = [];
      for (let x = 0; x < width + 2; x++) {
        row.push({
          id: indexCounter++,
          offset: x % 2 ? false : true,
          bg: Math.floor(Math.random() * 3),
          outline: Math.floor(Math.random() * 3),
          active: x > 0 && y > 0 && x <= width && y <= height ? true : false,
          number: 0,
          x,
          y

        })

      }

      matrix.push(row)

    }


    return matrix;
  }

  getNormalizedObject(matrix, mines) {

    let height = matrix.length;
    let width = matrix[0].length;
    let normalizedObject = {};

    for (let y = 0; y < height; y++) {

      for (let x = 0; x < width; x++) {

        let id = matrix[y][x].id;
        if (id > 0) {
          normalizedObject[id] = {
            ...matrix[y][x],

            left: false,
            right: false,
            show: false,
            flag: false,
            mine: false,
            poten: false,
            surrounding: surrounding(matrix, id, y, x)

          }
        }

      }

    }

    this.setMines(normalizedObject, mines);


    console.warn(normalizedObject)

    function surrounding(matrix, id, y, x) {
      let surrounding = [];
      let cell = matrix[y][x]
      if (!cell.active) { return [] }
      let vertical = [y - 1, y, y + 1];
      let horizontal = [x - 1, x, x + 1];


      for (let v in vertical) {
        for (let h in horizontal) {
          if (y === vertical[v] && horizontal[h] === x) { } else {
            if (matrix[vertical[v]][horizontal[h]].active) {
              let condition = false;
              if (cell.offset) {
                condition = (vertical[v] == (y - 1) && horizontal[h] !== x)
              } else {
                condition = (vertical[v] == (y + 1) && horizontal[h] !== x)
              }


              if (!condition) {
                surrounding.push(matrix[vertical[v]][horizontal[h]].id)
              }
            }
          }
        }
      }








      return surrounding
    }

    return normalizedObject


  }

  setMines(normalizedObject, mines) {
    console.log('setMines', mines);
    let freeCells = [];

    for (var key in normalizedObject) {
      let cell = normalizedObject[key]
      if (cell.active && cell.mine === false) {
        freeCells.push(cell.id);
      }
    }

    for (let i = 0; i < mines; i++) {

      let freeCount = freeCells.length;
      let number = Math.floor(Math.random() * freeCount);
      normalizedObject[freeCells[number]].mine = true;

      let surrounding = normalizedObject[freeCells[number]].surrounding;
      // console.log('surrounding', normalizedObject[freeCells[number]].id, surrounding)
      for (let sib in surrounding) {
        normalizedObject[surrounding[sib]].number++
      }
      freeCells.splice(freeCells.indexOf(freeCells[number]), 1)
    }

  }

  handleClick(item, e) {

    e.preventDefault();

    if (!item.active || !this.gameRunning) {
      return
    }

    // google spread operator
    const showCell = { ...item, show: true, flag: false };


    if (e.type === "click") {
      //console.log("Left click", e.target);
      if (item.number === 0 && !item.mine) {
        let spreadArr = [item.id];
        this.spread(spreadArr, item);

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
          this.gameRunning = false
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

  handleMouseDown(item, e) {
    //console.log('handleMouseDown', e.type, e.button);
    if (e.button !== 0) {
      return
    }

    if (item.show === true && item.number > 0) {

      let markedMines = item.surrounding.reduce((sum, sibling) =>
        sum + this.normalizedObject[sibling].flag, 0
      )

      if (item.number === markedMines) {
        //  console.log('show')

        item.surrounding.map((cursor) => {
          if (!this.normalizedObject[cursor].flag) {

            this.setCell({ ...this.normalizedObject[cursor], show: true })

            if (this.normalizedObject[cursor].mine) {
              this.gameRunning = false;
            }
          }
        })

      } else {
        console.log('hilight')

      }

    }


  }

  spread(spreadArr, item) {

    for (let poten in item.surrounding) {

      let cursor = item.surrounding[poten];

      if (spreadArr.indexOf(cursor) < 0) {
        spreadArr.push(cursor);
        //console.log('cursor.number ', this.normalizedObject[cursor].number, cursor)

        if (this.normalizedObject[cursor].number === 0) {
          this.spread(spreadArr, this.normalizedObject[cursor]);
        }
      }


    }

    return spreadArr;


  }

  setCell(item) {
    this.setNormalized((normalized) => ({
      ...normalized,
      [item.id]: item,
    }));
  }


}



export default Minesweeper;