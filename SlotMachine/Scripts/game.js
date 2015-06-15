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
var bet = document.getElementById("bet");
var stage;
var stats;
var assets;
var manifest = [
    { id: "background", src: "assets/images/slotMachine.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];
var atlas = {
    "images": ["assets/images/atlas.png"],
    "frames": [
        [2, 2, 60, 61, 0, 0, 0],
        [2, 65, 60, 61, 0, 0, 0],
        [64, 2, 60, 61, 0, 0, 0],
        [64, 65, 60, 61, 0, 0, 0],
        [126, 2, 60, 61, 0, 0, 0],
        [126, 65, 55, 55, 0, -8, -7],
        [183, 65, 61, 46, 0, -5, -12],
        [188, 2, 49, 57, 0, -11, -10],
        [239, 2, 46, 58, 0, -13, -5],
        [246, 62, 58, 44, 0, -7, -13],
        [287, 2, 54, 47, 0, -7, -13],
        [343, 2, 53, 66, 0, -9, -2],
        [306, 70, 43, 53, 0, -13, -10],
        [351, 70, 47, 47, 0, -11, -11]
    ],
    "animations": {
        "betmax": [0],
        "betone": [1],
        "betten": [2],
        "reset": [3],
        "spin": [4],
        "orange": [5],
        "bigwin": [6],
        "seven": [7],
        "plum": [8],
        "lemon": [9],
        "banana": [10],
        "bar": [11],
        "peach": [12],
        "watermelon": [13]
    }
};
// Game Variables
var background;
var textureAtlas;
var spinButton;
var resetButton;
var betoneButton;
var bettenButton;
var betmaxButton;
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
    // event listener triggers 60 times every second
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
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';
    document.body.appendChild(stats.domElement);
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
function resetButtonClicked(event) {
    createjs.Sound.play("clicked");
    //btnSpin.click();
}
// Callback function that allows me to respond to button click events
function spinButtonClicked(event) {
    createjs.Sound.play("clicked");
    btnSpin.click();
}
/* Utility function to reset the player stats */
function resetAll() {
    alert("resetAll");
}
// Callback functions that change the alpha transparency of the button
// Our Main Game Function
function main() {
    // add in slot machine graphic
    background = new createjs.Bitmap(assets.getResult("background"));
    stage.addChild(background);
    // add spinButton sprite
    spinButton = new objects.Button("spin", 320, 500, false);
    stage.addChild(spinButton);
    spinButton.on("click", spinButtonClicked, this);
    // add resetButton
    resetButton = new objects.Button("reset", 20, 500, false);
    stage.addChild(resetButton);
    resetButton.on("click", resetButtonClicked, this);
    // add bet buttons
    betoneButton = new objects.Button("betone", 100, 500, false);
    stage.addChild(betoneButton);
    betoneButton.on("click", function (event) {
        bet.innerText = "1";
    });
    bettenButton = new objects.Button("betten", 170, 500, false);
    stage.addChild(bettenButton);
    bettenButton.on("click", function (event) {
        bet.innerText = "10";
    });
    betmaxButton = new objects.Button("betmax", 240, 500, false);
    stage.addChild(betmaxButton);
    betmaxButton.on("click", function (event) {
        bet.innerText = "100";
    });
}
//# sourceMappingURL=game.js.map