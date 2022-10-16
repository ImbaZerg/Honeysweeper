


export function cl(item) { return console.log(item) }

let width = 10;
let height = 10;


export function initialization(height, width, mines) {
    //field = getMatrix(height, width)
}

export function getInfo(event) { }

export function getMatrix(height, width) {

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

export function getNormalizedObject(matrix, mines) {

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

    setMines(normalizedObject, mines);


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


                        if (!condition)  {
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

function setMines(normalizedObject, mines) {
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