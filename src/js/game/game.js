import Input from "./inputHandler.js"
import { Vector2, SimpleTimer, CreateArray2D } from "./util.js"
import RenderGame from "./gameRender.js"
import { Tetromino, TetrisScore, GenerateTetromino, Block } from "./tetromino.js"

// ---------------- INPUT ----------------

const inp = new Input();

inp.addInput('up', "w", "ArrowUp", () => MoveY(-1));
inp.addInput('down', "s", "ArrowDown", () => MoveY(1));
inp.addInput('right', "d", "ArrowRight", () => MoveX(1));
inp.addInput('left', "a", "ArrowLeft", () => MoveX(-1));
inp.addInput('rotateLeft', "q", "z", () => Rotate(-1));
inp.addInput('rotateRight', "e", "x", () => Rotate(1));
inp.addInput('pause', "p", "p", () => GamePause());
inp.addInput('restart', "r", "r", () => Restart());

// inp.addInput('up', "k", "", () => up());
// inp.addInput('down', "j", "", () => down());
// function up(){
//     score.score += 100;
//     UpdateScore();
// }
// function down(){
//     score.score -= 100;
//     UpdateScore();
// }


// ---------------- HTML ELEMENTS ----------------

const canvas = document.getElementById("tetris-canvas");

const timerHtml = document.getElementById("timer");

const scoreHtml = document.getElementById("score");

/** @type {HTMLAudioElement} */
const musicHtml = document.getElementById("music");

// ---------------- EVENTS ----------------



// ---------------- VARS ----------------
const backgroundColor = "black";
// 12 20
const bound = new Vector2(12, 20);

const render = new RenderGame(canvas, bound.x, bound.y);
render.SetCanvasStyleSize(Math.min(bound.x * 20, 1200), Math.min(bound.y * 20, 1200 * .6));

const timer = new SimpleTimer();

const score = new TetrisScore();

/** @type {Block[][]} */
const gameArea = CreateArray2D(bound.x, bound.y);
InitGameArea();

// ---------------- BASIC GAME FUNCS ----------------

function InitGameArea() {
    for (let x = 0; x < gameArea.length; x++)
        for (let y = 0; y < gameArea[x].length; y++)
            gameArea[x][y] = new Block(backgroundColor, x, y);
}

function SetGameArea() {
    for (let x = 0; x < gameArea.length; x++)
        for (let y = 0; y < gameArea[x].length; y++)
            gameArea[x][y].Reset();
}

function Setup() {
    SetGameArea();
    timer.Reset();
    timerHtml.innerHTML = timer.ToString();
    GamePause(true);
    dropTime = 0;
    score.Reset();
    UpdateScore();
    NewTetromino();
}

function GamePause(bool) {
    paused = bool || !paused;
    if(paused){
        timer.Pause();
        musicHtml.pause();
    }
    else{
        timer.Resume();
        musicHtml.play();
    }
}

function Restart() {
    console.clear();
    Setup();
    GamePause(false);
    musicHtml.currentTime = 0;
}

/** @type {Tetromino}  */
var currentTetromino;

var paused = true;

var dropTime = 0;
const dropDelayLevels = [800, 700, 600, 500, 400, 300, 250, 200];
var dropDelay = dropDelayLevels[0];

var lastTime = 0;
function Update(time = 0) {
    if (paused) {
        requestAnimationFrame(Update);
        return;
    }

    const deltaTime = time - lastTime;
    lastTime = time;

    timer.Run(deltaTime);
    timerHtml.innerHTML = timer.ToString();
    if (timer.time > dropTime) {
        DropTetromino(1);
        dropTime = timer.time + dropDelay;
    }
    //Draw Area
    for (let x = 0; x < gameArea.length; x++)
        for (let y = 0; y < gameArea[x].length; y++)
            render.DrawPixelColor(gameArea[x][y].color, x, y);

    //Draw Current Shape
    for (let x = 0; x < currentTetromino.matrix.length; x++)
        for (let y = 0; y < currentTetromino.matrix[x].length; y++)
            if (currentTetromino.matrix[x][y] !== 0)
                render.DrawPixelColor(currentTetromino.color, x + currentTetromino.position.x, y + currentTetromino.position.y);

    requestAnimationFrame(Update);
}

// ---------------- GAME RULE FUNC ----------------

var inverted = 1;
function InvertTetris() {
    canvas.style.transform = inverted > 0 ? "rotate(180deg)" : "";
    inverted = -inverted;
}

function UpdateScore() {
    const currentScore = score.score;
    scoreHtml.innerHTML = currentScore;
    let speed = Math.floor(Math.min(currentScore/300, dropDelayLevels.length-1));
    dropDelay = dropDelayLevels[speed];
    musicHtml.volume = (speed+1) / (dropDelayLevels.length);
}

function NewTetromino() {
    currentTetromino = GenerateTetromino();
    currentTetromino.position.x = gameArea.length / 2 - 1;
    currentTetromino.position.y = -1;
}

function TetrominoToGameArea() {
    const pos = currentTetromino.position;
    const matrix = currentTetromino.matrix;
    for (let x = 0; x < matrix.length; x++)
        for (let y = 0; y < matrix[x].length; y++)
            if (matrix[x][y] !== 0) {
                let block = gameArea[x + pos.x][y + pos.y];
                if (block){
                    block.color = currentTetromino.color;
                    block.type = currentTetromino.type;
                    block.filled = true;
                }
            }
}

function EndGame() {
    for (let x = 0; x < gameArea.length; x++)
        if (gameArea[x][0].filled === true) {
            //LOSE CODE
            // TODO --> SEND DATA
            console.log("Game Ended");
            Setup();
            //LOSE CODE
            break;
        }
}

function SweepRows() {
    let lastRow = -1;
    let rowsCount = 0;

    for (let y = 0; y < gameArea[0].length; y++) {
        let isFull = true;
        let invert = false;
        for (let x = 0; x < gameArea.length; x++){
            if (gameArea[x][y].type === "D")
                invert = true;
            if (gameArea[x][y].filled === false) {
                isFull = false;
                break;
            }
        }

        if (isFull) {
            lastRow = y;
            rowsCount++;
            if(invert)
                InvertTetris();
        }
    }

    for (let y = lastRow; y >= 0; y--) {
        const row = y - rowsCount;
        if (row < 0)
            for (let x = 0; x < gameArea.length; x++)
                gameArea[x][y].Reset();
        else {
            for (let x = 0; x < gameArea.length; x++)
                gameArea[x][y].CopyOther(gameArea[x][row]);
        }
    }

    return rowsCount;
}

function PlaceTetromino() {
    TetrominoToGameArea();
    const rows = SweepRows();
    if (rows > 0){
        score.ScorePoints(rows);
        UpdateScore();
    }
    AreaLog();
    EndGame();
    NewTetromino();
}

// function HardDrop(){}

function DropTetromino(dir) {
    if (Collide(0, dir)) {
        PlaceTetromino();
    }
    else
        currentTetromino.MoveY(dir);
}

function Collide(moveX = 0, moveY = 0) {
    const matrix = currentTetromino.matrix;
    const pos = currentTetromino.position;
    for (let x = 0; x < matrix.length; x++)
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] !== 0) {
                let nx = x + pos.x + moveX;
                let ny = y + pos.y + moveY;
                if (!gameArea[nx] || !gameArea[nx][ny] || gameArea[nx][ny].filled === true)
                    return true;
            }
        }
    return false;
}

// ---------------- MOVING ----------------

function MoveX(dir) {
    if (paused) return;

    dir = dir * inverted;
    if (!Collide(dir, 0))
        currentTetromino.MoveX(dir);
}

function MoveY(dir) {
    if (paused) return;
    
    if (dir === inverted)
        DropTetromino(Math.abs(dir));
}

function Rotate(dir) {
    currentTetromino.Rotate(dir);
    if (Collide())
        currentTetromino.Rotate(-dir);
}

// ---------------- EXE ----------------

Setup();
Update();

function AreaLog() {
    let arr = CreateArray2D(bound.x, bound.y);
    for (let x = 0; x < arr.length; x++)
        for (let y = 0; y < arr[x].length; y++)
            arr[x][y] = gameArea[x][y].filled ? 1 : 0;

    //arr = arr[0].map((_, col) => arr.map(row => row[col]));
    console.table(arr);
}