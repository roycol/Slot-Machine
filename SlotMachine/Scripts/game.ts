/* 
    * file name: game.ts
    * author's name: Roy Kim
    * last modified by: Roy Kim
    * date last modified: June 20, 2015
    * program description: entire design and functional connection parts of Slotmachine
    * revision history: _v4
*/

/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="../config/constants.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />


// Game Framework Variables
var canvas = document.getElementById("canvas");
var btnSpin = document.getElementById("btnSpin");
var btnReset = document.getElementById("btnReset");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "background", src: "assets/images/slotMachine.png" },
    { id: "bet", src: "assets/audio/bet.wav" },
    { id: "reset", src: "assets/audio/coin.mp3" },
    { id: "begin", src: "assets/audio/begin.mp3" },
    { id: "spin", src: "assets/audio/spin.wav" }
];

// assign variables from Jason 
var atlas = {
    "images": ["assets/images/atlas.png"],

    "frames": [
        [2, 2, 53, 66, 0, -9, -2],
        [2, 70, 43, 53, 0, -13, -10],
        [47, 70, 54, 47, 0, -7, -13],
        [57, 2, 60, 61, 0, 0, 0],
        [103, 65, 46, 58, 0, -13, -5],
        [119, 2, 60, 61, 0, 0, 0],
        [151, 65, 49, 57, 0, -11, -10],
        [181, 2, 60, 61, 0, 0, 0],
        [202, 65, 55, 55, 0, -8, -7],
        [243, 2, 60, 61, 0, 0, 0],
        [259, 65, 47, 47, 0, -11, -11],
        [305, 2, 60, 61, 0, 0, 0],
        [308, 65, 61, 46, 0, -5, -12],
        [367, 2, 60, 61, 0, 0, 0],
        [429, 2, 60, 61, 0, 0, 0],
        [371, 65, 58, 44, 0, -7, -13],
        [431, 65, 40, 40, 0, 0, 0]
    ],

    "animations": {
        "bar": [0],
        "peach": [1],
        "banana": [2],
        "betmax": [3],
        "plum": [4],
        "betone": [5],
        "seven": [6],
        "betten": [7],
        "orange": [8],
        "reset": [9],
        "watermelon": [10],
        "resetActive": [11],
        "bigwin": [12],
        "spin": [13],
        "spinActive": [14],
        "lemon": [15],
        "power": [16]
    }
};


// Game Variables
var background: createjs.Bitmap;
var textureAtlas: createjs.SpriteSheet;
var spinButton: objects.Button;
var resetButton: objects.Button;
var betoneButton: objects.Button;
var bettenButton: objects.Button;
var betmaxButton: objects.Button;
var powerButton: objects.Button;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

var spinResult;
var fruits = "";
var btnActiveAry = [0,0,0,0,0]; 

// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);

    // Load Texture Atlas
    textureAtlas = new createjs.SpriteSheet(atlas);

    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    //event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '500px';
    stats.domElement.style.top = '10px';

    //document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

// Callback function that allows me to respond to button click events
function resetButtonClicked(event: createjs.MouseEvent) {

    var creditVal = parseInt((<HTMLTextAreaElement>document.getElementById('credits')).value);

    if (creditVal < 1000) {
        createjs.Sound.play("reset");
        btnReset.click();
    } else {
        alert("you already have enough money!!");
        return;;
    }
    
}

// Callback function that allows me to respond to button click events
function spinButtonClicked(event: createjs.MouseEvent) {

    var betVal = parseInt((<HTMLTextAreaElement>document.getElementById('bet')).value);

    if (betVal > 0) {
        createjs.Sound.play("spin");
        btnSpin.click();
    } else {
        alert("bet your credit first!!");
        return;;
    }
}

// Callback function that allows me to respond to button click events
function powerButtonClicked(event: createjs.MouseEvent) {
    window.close();
}

// function that set the spin button to be ready
function readyToSpin() {

    stage.removeChild(spinButton);
    // add spinButton sprite
    resetButton = new objects.Button("resetActive", 20, 500, false);
    stage.addChild(resetButton);
    resetButton.on("click", resetButtonClicked, this);

    spinButton = new objects.Button("spinActive", 320, 500, false);    
    stage.addChild(spinButton);
    spinButton.on("click", spinButtonClicked, this);
    btnActive(4, spinButton);
}

// begin btn animation (btn will begin blinking in 0.5 sec interval)
function btnActive(btnIdx:number, btn:objects.Button) {

    var flag = false;   
    //alert(btnActiveAry[btnIdx]);

    //in order to start blinking at the same time, stop all previous activated btn and restart it.
    for (var i= 0; i < btnActiveAry.length; i++){
        if (btnActiveAry[i] > 0) {
            stopBtnActive(i);
            //btnActiveAry[i] = setInterval(() => { btnActiveRun(i, btnAry[i]); }, 500);
            switch (i) {
                case 0:
                    btnActiveAry[i] = setInterval(() => { btnActiveRun(resetButton); }, 500);
                    break;
                case 1:
                    btnActiveAry[i] = setInterval(() => { btnActiveRun(betoneButton); }, 500);
                    break;
                case 2:
                    btnActiveAry[i] = setInterval(() => { btnActiveRun(bettenButton); }, 500);
                    break;
                case 3:
                    btnActiveAry[i] = setInterval(() => { btnActiveRun(betmaxButton); }, 500);
                    break;
                case 4:
                    btnActiveAry[i] = setInterval(() => { btnActiveRun(spinButton); }, 500);
                    break;
            }

            if (i == btnIdx) flag = true;
            
        }        
    }
    if (!flag) //run when the btn is not activated only.
        btnActiveAry[btnIdx] = setInterval(() => { btnActiveRun(btn); }, 500);
}

// function for changing btn alpha.
function btnActiveRun(btn: objects.Button) {
    
    if (btn.alpha == 0.8)
        btn.alpha = 1.0;
    else
        btn.alpha = 0.8

}

//stop btn animation
function stopBtnActive(btnIdx: number) {
    clearInterval(btnActiveAry[btnIdx]);
}

// Our Main Game Function
function main() {

    createjs.Sound.play("begin");

    var betVal;

    // add in slot machine graphic
    background = new createjs.Bitmap(assets.getResult("background"));
    stage.addChild(background);

    // add resetButton
    resetButton = new objects.Button("reset", 20, 500, false);
    stage.addChild(resetButton);
    resetButton.on("click", resetButtonClicked, this);

    // add betoneButton sprite
    betoneButton = new objects.Button("betone", 100, 500, false);
    stage.addChild(betoneButton);
    betoneButton.on("click", function (event) {
        betVal = parseInt((<HTMLTextAreaElement>document.getElementById('bet')).value);
        betVal += 1;
        (<HTMLTextAreaElement>document.getElementById('bet')).value = betVal.toString();
        createjs.Sound.play("bet");
        readyToSpin();
    });
    btnActive(1, betoneButton);

    // add bettenButton sprite
    bettenButton = new objects.Button("betten", 170, 500, false);
    stage.addChild(bettenButton);
    bettenButton.on("click", function (event) {
        betVal = parseInt((<HTMLTextAreaElement>document.getElementById('bet')).value);
        betVal += 10;
        (<HTMLTextAreaElement>document.getElementById('bet')).value = betVal.toString();
        createjs.Sound.play("bet");
        readyToSpin();
    });
    btnActive(2, bettenButton);

    // add betmaxButton sprite
    betmaxButton = new objects.Button("betmax", 240, 500, false);
    stage.addChild(betmaxButton);
    betmaxButton.on("click", function (event) {
        betVal = parseInt((<HTMLTextAreaElement>document.getElementById('bet')).value);
        betVal += 100;
        (<HTMLTextAreaElement>document.getElementById('bet')).value = betVal.toString();
        createjs.Sound.play("bet");
        readyToSpin();
    });
    btnActive(3, betmaxButton);

    // add spinButton sprite
    spinButton = new objects.Button("spin", 320, 500, false);
    stage.addChild(spinButton);
    spinButton.on("click", spinButtonClicked, this);

    // add powerButton sprite
    powerButton = new objects.Button("power", 412, 483, false);
    stage.addChild(powerButton);
    powerButton.on("click", powerButtonClicked, this);
        
}
