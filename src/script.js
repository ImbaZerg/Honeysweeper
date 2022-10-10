


export function cl(item) { return console.log(item) }

let width = 10;
let height = 10;
export let field = [];

export function initialization(height, width, mines) {
    field = getMatrix(height, width)
}

export function getInfo(event) { }

function getMatrix(height, width) {

    let matrix = [];

    let indexCounter = 1;
    for (let y = 0; y < height; y++) {

        let row = [];
        for (let x = 0; x < width; x++) {
            row.push({
                id: indexCounter++,
                left: false,
                right: false,
                show: false,
                flag: false,
                mine: false,
                poten: false,
                offset: x % 2 ? false : true,
                number: 0,
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