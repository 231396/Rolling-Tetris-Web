//#region ---------------- GAMERENDER ----------------

class RenderGame {    
	/** @param {HTMLCanvasElement} canvas*/
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}
	SetCanvasSize(width, height){
		this.canvas.width = width;
		this.canvas.height = height;
	}
	SetCanvasStyleSize(width, height){
		this.canvas.style.width = width + "px";
		this.canvas.style.height = height + "px";
	}
	ClearRender() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	DrawBackground(color = "white"){
		this.context.fillStyle = color;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
	SetPixelColor(color){
		this.context.fillStyle = color;
	}
	DrawPixel(x, y) {
		this.context.fillRect(x, y, 1, 1);
	}
	DrawPixelColor(color, x, y){
		this.context.fillStyle = color;
		this.context.fillRect(x, y, 1, 1);
	}
}
//#endregion

//#region ---------------- InputHandler ----------------

class Input
{
	constructor(){
		//<String, InputKey>
		this.inputs = new Map();
		//document.addEventListener('keydown', (ev) => this.handleKeydown(ev));
		document.onkeydown = (ev) => this.handleKeydown(ev);
	}

	/** @param {string} keyName the funtion of key */
	/** @param {string} keyCode the keycode*/
	/** @param {string=} altKeyCode alternative keycode*/
	/** @param {function} func is alt key*/
	addInput(keyName, keyCode, altKeyCode, func){
		this.inputs.set(keyName, new InputKey(keyCode, altKeyCode, func))
	}

	/** @param {KeyboardEvent} event */
	handleKeydown(event) {
		const keyPressed = event.key;
		for (let [_, value] of this.inputs){
			if (value.verify(keyPressed))
				value.trigger();
		}
	}
}

class InputKey{
	/** @param {string} main */
	/** @param {string} [alt] */
	/** @param {function} func */
	constructor(main, alt, func)
	{
		this.main = main;
		this.alt = alt;
		this.func = func;
	}
	setMainKey(key){
		this.main = key;
	}
	setAltKey(key){
		this.alt = key;
	}
	verify(key){
		return key === this.main || key === this.alt;
	}
	trigger(){
		this.func();
	}
}
//#endregion

//#region ---------------- Tetromino ----------------

class TetrisScore{
	constructor(){
		this.score = 0;
		this.lines = 0;
		this.level = 0;
	}
	ScorePoints(rows){
		this.score += (20 * rows) * rows;
		this.lines += rows;
	}
	Reset(){
		this.level = 0;
		this.score = 0;
		this.lines = 0;
	}
}

const tetrominoTypes = "SZJLTOUID";

const tetrominoColors = {
	S: "Lime",
	Z: "Red",
	J: "RoyalBlue",
	L: "Orange",
	T: "RebeccaPurple",
	O: "Yellow",
	U: "Orchid",
	I: "Cyan",
	D: "Gray",
}


const tetrominoShapes = {
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

class Tetromino {
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

let lastTypes = [];
function GenerateTetromino(x = 0, y = 0){    
	//Select Shape
	let type = RandomValue(tetrominoTypes.length);
	while(lastTypes.includes(type)) 
		type = RandomValue(tetrominoTypes.length);
	lastTypes.push(type);
	if (lastTypes.length >= tetrominoTypes.length)
		lastTypes = [];
	
    // Generate
    const typeLetter = tetrominoTypes[type];
	const t = new Tetromino(tetrominoColors[typeLetter], typeLetter, x, y);
	return t;
}

var defaultBlockColor = "black";
class Block{
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
//#endregion 

//#region ---------------- Util ----------------

class Vector2 {
	/** @param {number} x @param {number} y*/
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	Set(x, y) {
		this.x = x;
		this.y = y;
	}

	/** @param {{ x: number; y: number; }} obj */
	set SetObject(obj){
	   this.Set(obj.x, obj.y);
	}

	get GetObject(){
		return {x: this.x, y: this.y};
	}
}

class SimpleTimer{
	constructor(){
		this.time = 0;
		this.paused = true;
	}
	Pause(){
		this.paused = true;
	}
	Resume(){
		this.paused = false;
	}
	Run(plusTime){
		if (!this.paused)
			this.time += plusTime;
	}
	Reset(){
		this.paused = true;
		this.time = 0;
	}
	ToString(){
		let minutes = Math.floor(this.time / 60000);
		let seconds = ((this.time % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}
}


/** @param {Number} rows @param {Number} cols */
function CreateArray2D(rows, cols){
	const array = [];
	while (rows--)
		array.push(new Array(cols));
	return array;
}
/** @param {Array[]} array */
function CopyArray2D(array){
	const copyArray = [];
	for (let i = 0; i < array.length; i++){
		copyArray.push(new Array(array[i].length));
		for (let j = 0; j < array[i].length; j++)
			copyArray[i][j] = array[i][j];
	}    
	return copyArray;
}

function RandomValue(max){
	return Math.floor(Math.random() * max);
}

function RandomValueMinMax(min, max){
	return Math.floor(Math.random() * (max - min) + min);
}

//#endregion


//#region ---------------- GAMEPLAY ----------------

// ---------------- INPUTS ----------------

const inp = new Input();

inp.addInput('up', "w", "ArrowUp", () => MoveY(-1));
inp.addInput('down', "s", "ArrowDown", () => MoveY(1));
inp.addInput('right', "d", "ArrowRight", () => MoveX(1));
inp.addInput('left', "a", "ArrowLeft", () => MoveX(-1));
inp.addInput('rotateLeft', "q", "z", () => Rotate(-1));
inp.addInput('rotateRight', "e", "x", () => Rotate(1));
inp.addInput('hardDrop', "f", "c", () => HardDrop());
inp.addInput('start', "Enter", "Enter", () => Start());
inp.addInput('pause', "p", null, () => InputPause());
inp.addInput('surrender', "r", null, () => Reset());
inp.addInput('mute', "m", null, () => Mute());

//inp.addInput('inv', "k", "", () => InvertTetris());

// ---------------- HTML ELEMENTS ----------------

const canvas = document.getElementById("tetris-canvas");

const timerHtml = document.getElementById("timer");
const scoreHtml = document.getElementById("score");
const levelHtml = document.getElementById("level");
const linesHtml = document.getElementById("lines");

/** @type {HTMLAudioElement} */
const musicHtml = document.getElementById("music");
musicHtml.volume = .12;
const gameTextHtml = document.getElementById("game-text");

const muteHtml = document.getElementById("btn-mute");
muteHtml.onclick = () => Mute();

const pauseHtml = document.getElementById("btn-pause");
pauseHtml.onclick = () => InputPause();

document.getElementById("btn-start").onclick = () => Start();
document.getElementById("btn-reset").onclick = () => Reset();

document.getElementById("btn-board-normal").onclick = () => SetArenaSize(10, 20);
document.getElementById("btn-board-big").onclick = () => SetArenaSize(22, 44);
const sizeHtml = document.getElementById("btn-board-size");

// ---------------- VARS ----------------
const backgroundColor = "black";

const render = new RenderGame(canvas);
// render.SetCanvasStyleSize(Math.min(bound.x * 20, 1200), Math.min(bound.y * 20, 1200 * .6));

const timer = new SimpleTimer();

const score = new TetrisScore();

/** @type {Block[][]} */
var gameArea;

/** @type {Vector2} */
var bound;

var inGame;
var readyStart;

/** @type {Tetromino}  */
var currentTetromino;

var paused = true;

var dropTime = 0;
const initialDropDelay = 1000;
const dropDelayMutipliyer = 100;
var dropDelay = initialDropDelay;
var lastTime = 0;
var canHardDrop = true;

SetArenaSize(10, 20);
Update();
// ---------------- BASIC GAME FUNCS ----------------

function Mute(){
    musicHtml.muted = !musicHtml.muted;
    muteHtml.innerHTML = musicHtml.muted ? "Desmutar" : "Mutar";
}

function SetArenaSize(width, height){
    if (inGame) return;
    render.SetCanvasSize(width, height);
    gameArea = CreateArray2D(width, height);
    bound = new Vector2(width, height);
    sizeHtml.innerHTML = `${width} x ${height}`;
    InitGameArea();
    Setup();
}

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
    pauseHtml.innerHTML = "Pausar";
	dropTime = 0;
	score.Reset();
	UpdateScore();
	NewTetromino();
	for (let x = 0; x < gameArea.length; x++)
		for (let y = 0; y < gameArea[x].length; y++)
            render.DrawPixelColor(gameArea[x][y].color, x, y);
    gameTextHtml.innerHTML = "Rolling Tetris";
    readyStart = true;
}

function InputPause() {
    if (inGame)
        GamePause();
}

function GamePause(bool) {
	paused = bool || !paused;
	if(paused){
		timer.Pause();
        musicHtml.pause();
        gameTextHtml.innerHTML = "Pausado";
        pauseHtml.innerHTML = "Continuar";
	}
	else{
        timer.Resume();
		musicHtml.play();
        gameTextHtml.innerHTML = "";
        pauseHtml.innerHTML = "Pausar";
	}
}

function Start(){
	if (inGame) return;
    console.clear();
    if (!readyStart)
	    Setup();
	GamePause(false);
	musicHtml.currentTime = 0;
	if (inverted < 0)
		InvertTetris();
    inGame = true;
    readyStart = false;
}

function Reset(){
    EndGame();
    Setup();
}

function Update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

	if (paused || !inGame) {
		requestAnimationFrame(Update);
		return;
	}

	timer.Run(deltaTime);
	timerHtml.innerHTML = timer.ToString();
	if (timer.time > dropTime) {
		DropTetromino();
        dropTime = timer.time + dropDelay;
        canHardDrop = true;
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
	linesHtml.innerHTML = score.lines;
	
	let level = 1 + Math.floor(currentScore/300);
	score.level = level;
	levelHtml.innerHTML = score.level;

	dropDelay = Math.max(initialDropDelay - ((level-1) * dropDelayMutipliyer), 60);

    //musicHtml.volume = Math.min(1, level/10);
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

function GameEnded() {
	for (let x = 0; x < gameArea.length; x++)
		if (gameArea[x][0].filled === true) {
			EndGame();
			return;
		}
}

function EndGame(){
    //console.log("Game Ended");
    SendTry();
    GamePause(true);
    gameTextHtml.innerHTML = "Game Over";
	inGame = false;
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
	//AreaLog();
	GameEnded();
	NewTetromino();
}

function DropTetromino() {
	if (Collide(0, 1))
		PlaceTetromino();
	else
		currentTetromino.MoveY(1);
}

function HardDrop() {
    if(!canHardDrop || paused) return;
    while(!Collide(0, 1))
        currentTetromino.MoveY(1);
    PlaceTetromino();
    canHardDrop = false;
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
        DropTetromino();
}

function Rotate(dir) {
	currentTetromino.Rotate(dir);
	if (Collide())
		currentTetromino.Rotate(-dir);
}

//#endregion Gameplay

// ---------------- LOG ----------------

function AreaLog() {
	let arr = CreateArray2D(bound.x, bound.y);
	for (let x = 0; x < arr.length; x++)
		for (let y = 0; y < arr[x].length; y++)
			arr[x][y] = gameArea[x][y].filled ? 1 : 0;

	//arr = arr[0].map((_, col) => arr.map(row => row[col]));
	console.table(arr);
}

// ---------------- TABLE & DATABASE ----------------

//TODO get from logged player
var username = "Tester"; 

const usernameHtml = document.getElementById("user-name");
usernameHtml.innerHTML = username;

const tableHtml = document.getElementById("player-table"); 

function SendTry(){   
    var tryScore = score.score;
    var tryLevel = score.level;
    var tryTimer = timer.ToString();
    
    AddToTable(tryScore, tryLevel, tryTimer);
    SendTryData(tryScore, tryLevel, tryTimer);
}

function SendTryData(){
    //TODO - Send try data to php
}

function GetTrysData(){
    //TODO - get trys from php
}

var tableFirst;
function AddToTable(playScore, playLevel, playDuration)
{
    newTr = document.createElement("tr");
    
    const scoreTd = document.createElement("td");
    scoreTd.innerHTML = playScore;
    const levelTd = document.createElement("td");
    levelTd.innerHTML = playLevel;
    const durationTd = document.createElement("td");
    durationTd.innerHTML = playDuration;
    
    newTr.appendChild(scoreTd);
    newTr.appendChild(levelTd);
    newTr.appendChild(durationTd);
    
    tableHtml.insertBefore(newTr, tableFirst);
    tableFirst = newTr;
}


//TODO - KEEP PLAYER LOGGED