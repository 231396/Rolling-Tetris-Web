import { Vector2, CopyArray2D, RandomValue } from "./util.js"

// const tetrominoEnum= {
// 	top: 0,
// 	right: 1,
// 	bottom: 2,
// 	left: 3
// }

export class TetrisScore{
    constructor(){
        this.score = 0;
    }
    ScorePoints(rows){
        this.score += (10 * rows) * rows;
    }
    Reset(){
        this.score = 0;
    }
}

export const tetrominoShapes = {
	S: 	
    [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
	Z: 
    [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
	J: 	
    [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
	L: 
    [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
	T:	
    [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ],
	O: 
    [ 
        [1,1], 
        [1,1], 
    ],
	U:
    [
        [1,0,1],
        [1,1,1],
        [0,0,0],
    ],
	I:
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
	D: [ [1] ], //Dot
}

export const tetrominoTypes = "SZJLTOUID";

export const tetrominoColors =[
    "Cyan", "MediumBlue", "RebeccaPurple", 
    "Yellow", "Red", "Orange", "Lime",
]

export class Tetromino {
    /** @param {String} color * @param {String} type * 
     * @param {Number} PosX * @param {Number} PosY */
    constructor(color, type, PosX = 0, PosY = 0){
        this.color =  color;
        this.position = new Vector2(PosX, PosY);
        this.type = type;
        /** @type {Number[][]} */
        this.matrix = CopyArray2D(tetrominoShapes[type]);
    }
    MoveX(move){
        this.position.x += move;
    }
    MoveY(move){
        this.position.y += move;
    }
    ToBlocks(){
        let blocks = [];
        for (let x = 0; x < this.matrix.length; x++)
            for (let y = 0; y < this.matrix[x].length; y++)
                if (this.matrix[x][y] !== 0)
                    blocks.push(new Block(this.color, x + this.position.x, y + this.position.y));
        return blocks;
    }
    Rotate(dir) {
        for (let y = 0; y < this.matrix.length; y++)
            for (let x = 0; x < y; x++)
                [this.matrix[x][y], this.matrix[y][x]] = [this.matrix[y][x],this.matrix[x][y]];    
        if (dir > 0)
            this.matrix.forEach(el => el.reverse());
        else
            this.matrix.reverse();
    }
}

let lastColor = -1;
let lastTypes = [];
export function GenerateTetromino(x = 0, y = 0){    
    //Select Colors
    let color = lastColor;
    while(color === lastColor) 
        color = RandomValue(tetrominoColors.length); 
    lastColor = color;

    //Select Shape
    let type = RandomValue(tetrominoTypes.length);
    while(lastTypes.includes(type)) 
        type = RandomValue(tetrominoTypes.length);
    lastTypes.push(type);
    if (lastTypes.length >= tetrominoTypes.length)
        lastTypes = [];
    
    // Generate
    const t = new Tetromino(tetrominoColors[color], tetrominoTypes[type], x, y);
    return t;
}

var defaultBlockColor = "black";
export class Block{
    /**
     * @param {String} type 
     * @param {String} color 
     * @param {Number} posX 
     * @param {Number} posY 
     * @param {Boolean} [filled]
     */
    constructor(type, color, posX, posY, filled = false){
        this.x = posX;
        this.y = posY;
        this.color = color;
        this.type = type;
        this.filled = filled;
    }
    SetGlobalDefaultColor(color){
        defaultBlockColor = color;
    }
    /** @param {Block} block */
    CopyOther(block){
        this.type = block.type;
        this.color = block.color;
        this.filled = block.filled;
    }
    Reset(){
        this.color = defaultBlockColor;
        this.filled = false;
    }
}