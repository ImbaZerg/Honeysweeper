


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
                id: x > 0 && y > 0 && x <= width && y <= height ? indexCounter++ : 0,
                offset: x % 2 ? false : true,
                bg: Math.floor(Math.random() * 3),
                outline: Math.floor(Math.random() * 4),

                x,
                y

            })

        }

        matrix.push(row)

    }


    return matrix;
}

export function getNormalizedObject(matrix) {

    let height = matrix.length - 1;
    let width = matrix[0].length - 1;
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

                    number: 0,
                    get active() {
                        return this.id === 0 ? false : true;
                    }
                }
            }

        }

    }

    cl(normalizedObject)

    return normalizedObject
}