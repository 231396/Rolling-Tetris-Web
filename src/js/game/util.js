export class Vector2 {
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

export class SimpleTimer{
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
export function CreateArray2D(rows, cols){
    const array = [];
    while (rows--)
        array.push(new Array(cols));
    return array;
}
/** @param {Array[]} array */
export function CopyArray2D(array){
    const copyArray = [];
    for (let i = 0; i < array.length; i++){
        copyArray.push(new Array(array[i].length));
        for (let j = 0; j < array[i].length; j++)
            copyArray[i][j] = array[i][j];
    }    
    return copyArray;
}

export function RandomValue(max){
    return Math.floor(Math.random() * max);
}

export function RandomValueMinMax(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}