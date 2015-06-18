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
var stage;
var stats;
var assets;
var manifest = [
    { id: "background", src: "assets/images/slotMachine.png" },
    { id: "bet", src: "assets/audio/bet.wav" },
    { id: "reset", src: "assets/audio/coin.mp3" },
    { id: "begin", src: "assets/audio/begin.mp3" },
    { id: "spin", src: "assets/audio/spin.wav" }
];
var atlas = {
    "images": ["assets/images/atlas.png"],
    "frames": [
        [2, 2, 60, 61, 0, 0, 0],
        [2, 65, 60, 61, 0, 0, 0],
        [64, 2, 60, 61, 0, 0, 0],
        [64, 65, 60, 61, 0, 0, 0],
        [126, 2, 60, 61, 0, 0, 0],
        [126, 65, 60, 61, 0, 0, 0],
        [188, 2, 60, 61, 0, 0, 0],
        [188, 65, 55, 55, 0, -8, -7],
        [245, 65, 61, 46, 0, -5, -12],
        [250, 2, 49, 57, 0, -11, -10],
        [301, 2, 46, 58, 0, -13, -5],
        [308, 62, 58, 44, 0, -7, -13],
        [349, 2, 54, 47, 0, -7, -13],
        [405, 2, 53, 66, 0, -9, -2],
        [368, 70, 43, 53, 0, -13, -10],
        [413, 70, 47, 47, 0, -11, -11]
    ],
    "animations": {
        "betmax": [0],
        "betone": [1],
        "betten": [2],
        "reset": [3],
        "resetActive": [4],
        "spin": [5],
        "spinActive": [6],
        "orange": [7],
        "bigwin": [8],
        "seven": [9],
        "plum": [10],
        "lemon": [11],
        "banana": [12],
        "bar": [13],
        "peach": [14],
        "watermelon": [15]
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
var btnActiveAry = [0, 0, 0, 0, 0];
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
    stats.domElement.style.left = '500px';
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
    var creditVal = parseInt(document.getElementById('credits').value);
    if (creditVal < 1000) {
        createjs.Sound.play("reset");
        btnReset.click();
    }
    else {
        alert("you already have enough money!!");
        return;
        ;
    }
}
// Callback function that allows me to respond to button click events
function spinButtonClicked(event) {
    var betVal = parseInt(document.getElementById('bet').value);
    if (betVal > 0) {
        createjs.Sound.play("spin");
        btnSpin.click();
    }
    else {
        alert("bet your credit first!!");
        return;
        ;
    }
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
//begin btn animation
function btnActive(btnIdx, btn) {
    //alert("btnActive");
    var flag = false;
    //alert(btnActiveAry[btnIdx]);
    for (var i = 0; i < btnActiveAry.length; i++) {
        if (btnActiveAry[i] > 0) {
            stopBtnActive(i);
            //btnActiveAry[i] = setInterval(() => { btnActiveRun(i, btnAry[i]); }, 500);
            switch (i) {
                case 0:
                    btnActiveAry[i] = setInterval(function () { btnActiveRun(resetButton); }, 500);
                    break;
                case 1:
                    btnActiveAry[i] = setInterval(function () { btnActiveRun(betoneButton); }, 500);
                    break;
                case 2:
                    btnActiveAry[i] = setInterval(function () { btnActiveRun(bettenButton); }, 500);
                    break;
                case 3:
                    btnActiveAry[i] = setInterval(function () { btnActiveRun(betmaxButton); }, 500);
                    break;
                case 4:
                    btnActiveAry[i] = setInterval(function () { btnActiveRun(spinButton); }, 500);
                    break;
            }
            if (i == btnIdx)
                flag = true;
        }
    }
    if (!flag)
        btnActiveAry[btnIdx] = setInterval(function () { btnActiveRun(btn); }, 500);
}
function btnActiveRun(btn) {
    if (btn.alpha == 0.8)
        btn.alpha = 1.0;
    else
        btn.alpha = 0.8;
}
//stop btn animation
function stopBtnActive(btnIdx) {
    clearInterval(btnActiveAry[btnIdx]);
}
// Our Main Game Function
function main() {
    createjs.Sound.play("begin");
    var betVal = parseInt(document.getElementById('bet').value);
    // add in slot machine graphic
    background = new createjs.Bitmap(assets.getResult("background"));
    stage.addChild(background);
    // add resetButton
    resetButton = new objects.Button("reset", 20, 500, false);
    stage.addChild(resetButton);
    resetButton.on("click", resetButtonClicked, this);
    // add bet buttons
    betoneButton = new objects.Button("betone", 100, 500, false);
    stage.addChild(betoneButton);
    betoneButton.on("click", function (event) {
        betVal += 1;
        document.getElementById('bet').value = betVal.toString();
        createjs.Sound.play("bet");
        readyToSpin();
    });
    btnActive(1, betoneButton);
    bettenButton = new objects.Button("betten", 170, 500, false);
    stage.addChild(bettenButton);
    bettenButton.on("click", function (event) {
        betVal += 10;
        document.getElementById('bet').value = betVal.toString();
        createjs.Sound.play("bet");
        readyToSpin();
    });
    btnActive(2, bettenButton);
    betmaxButton = new objects.Button("betmax", 240, 500, false);
    stage.addChild(betmaxButton);
    betmaxButton.on("click", function (event) {
        betVal += 100;
        document.getElementById('bet').value = betVal.toString();
        createjs.Sound.play("bet");
        readyToSpin();
    });
    btnActive(3, betmaxButton);
    // add spinButton sprite
    spinButton = new objects.Button("spin", 320, 500, false);
    stage.addChild(spinButton);
    spinButton.on("click", spinButtonClicked, this);
}
//# sourceMappingURL=game.js.map