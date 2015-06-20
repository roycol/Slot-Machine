var credits = 1000;
var jackpot = 5000;
var bet = 0;
var winnerPaid = 0;
var reels = [];

var turn = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult = [0, 0, 0];
var fruits = "";
var winRatio = 0;
var peaches = 0;
var bananas = 0;
var oranges = 0;
var plums = 0;
var bars = 0;
var lemons = 0;
var sevens = 0;
var watermelons = 0;

/* Utility function to show Player Stats */
function showPlayerStats() {   
    $("#jackpot").val(jackpot);
    $("#credits").val(credits);
    $("#bet").val(bet);
    $("#winnerPaid").val(winnerPaid);
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    peaches = 0;
    bananas = 0;
    oranges = 0;
    plums = 0;
    bars = 0;
    lemons = 0;
    sevens = 0;
    watermelons = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    credits = 1000;
    winnerPaid = 0;
    jackpot = 5000;
    turn = 0;
    bet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;

    showPlayerStats();
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        credits += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    credits += winnerPaid;
    $("div#winOrLose").text("You Won: $" + winnerPaid);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    credits -= bet;
    $("div#winOrLose").text("You Lost!");
    resetFruitTally();
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

/* When this function is called it determines the betLine results. */
function chkReels(idx, val) {
     
    //console.log(idx + ": " + reels[idx]);
    //console.log(val + ": " + reels[idx][val]);

    var icon = String(reels[idx][val]);
    var iconName = icon.substring(icon.lastIndexOf("/icon/") + 6, icon.indexOf(".png"));
    console.log(idx + "-iconName :" + iconName);
    
    switch (iconName) {
        case "watermelon":  // watermelon
            watermelons++;
            break;
        case "peach": // peaches
            peaches++;
            break;
        case "banana": // banana
            bananas++;
            break;
        case "orange": // orange
            oranges++;
            break;
        case "plum": //  plum
            plums++;
            break;
        case "bar": //  bar
            bars++;
            break;
        case "lemon": //  lemon
            lemons++;
            break;
        case "seven": //  seven
            sevens++;
            break;
    }

}

/* When this function is called it gets initial ramdom reels */
function getRandomReels() {
    var betLine = [];    
    var outCome = [0, 0, 0];
    var temp, selectedIdx;

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);

        var betContent = ['<img src="assets/images/icon/banana.png" />', '<img src="assets/images/icon/bar.png" />', '<img src="assets/images/icon/lemon.png" />'
			, '<img src="assets/images/icon/orange.png" />', '<img src="assets/images/icon/peach.png" />', '<img src="assets/images/icon/plum.png" />'
			, '<img src="assets/images/icon/seven.png" />', '<img src="assets/images/icon/watermelon.png" />'];

        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/watermelon.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/watermelon.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/peach.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/peach.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/banana.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/banana.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/orange.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/orange.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/plum.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/plum.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/bar.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/bar.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/lemon.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/lemon.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability

                temp = betContent[0];
                for (var i = 1; i < betContent.length; i++) {
                    if (betContent[i] == '<img src="assets/images/icon/seven.png" />')
                        selectedIdx = i;
                }

                betContent[0] = '<img src="assets/images/icon/seven.png" />';
                betContent[selectedIdx] = temp;

                betLine[spin] = betContent;
                break;
        }
               
    }
   
    return betLine;
}

/* This function calculates the player's winnerPaid, if any */
function determineWinnings() {
    //alert("watermelons :" + watermelons);
    if (watermelons == 0) {
        if (peaches == 3) {
            winnerPaid = bet * 10;
        }
        else if (bananas == 3) {
            winnerPaid = bet * 20;
        }
        else if (oranges == 3) {
            winnerPaid = bet * 30;
        }
        else if (plums == 3) {
            winnerPaid = bet * 40;
        }
        else if (bars == 3) {
            winnerPaid = bet * 50;
        }
        else if (lemons == 3) {
            winnerPaid = bet * 75;
        }
        else if (sevens == 3) {
            winnerPaid = bet * 100;
        }
        else if (peaches == 2) {
            winnerPaid = bet * 2;
        }
        else if (bananas == 2) {
            winnerPaid = bet * 2;
        }
        else if (oranges == 2) {
            winnerPaid = bet * 3;
        }
        else if (plums == 2) {
            winnerPaid = bet * 4;
        }
        else if (bars == 2) {
            winnerPaid = bet * 5;
        }
        else if (lemons == 2) {
            winnerPaid = bet * 10;
        }
        else if (sevens == 2) {
            winnerPaid = bet * 20;
        }
        else if (sevens == 1) {
            winnerPaid = bet * 5;
        }
        else {
            winnerPaid = bet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

/* When the player clicks the spin button the game kicks off */

function check() {
    bet = $("#bet").val();
    
    if (credits == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
        }
    }
    else if (bet > credits) {
        alert("You don't have enough Money to place that bet.");
        $("#bet").val("0");
        bet = 0;
    }
    else if (bet <= 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (bet <= credits) {
        return true;
    }
    else {
        alert("Please enter a valid bet amount");        
    }

    return false;

}



/*
	Slot Machine
*/
var sm = (function(undefined){

	var tMax = 3000, // animation time, ms
		height = 750,
		speeds = [],
		r = [],
		$reels,
		start;

	reels = getRandomReels();

	function init(){
	    $reels = $('.reel').each(function (i, el) {
	        //alert("i: " + reels[i]);
	        el.innerHTML = '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div>'
		});
        
	    $('#btnReset').click(resetAll);
		$('#btnSpin').click(action);
	}

	function action(){
	    if (start !== undefined) return;

	    if (!check()) return;
		
		for (var i = 0; i < 3; ++i) {
		    speeds[i] = Math.random() + .5;
		    r[i] = Math.floor((Math.random() * 3 | 0) * height / 8);
            
			//alert(r[i]);
		}
		
		animate();
	}

	function animate(now){
		if (!start) start = now;
		var t = now - start || 0;

		for (var i = 0; i < 3; ++i) {
		    $reels[i].scrollTop = ((speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + r[i]) % height | 0) + 1;
            //console.log("$reels["+i+"].scrollTop:" + Math.floor($reels[i].scrollTop));
		}

		if (t < tMax)
			requestAnimationFrame(animate);
		else {

		    for (var i = 0; i < 3; ++i) {
		        //alert("$reels[i].scrollTop: " + Math.floor($reels[i].scrollTop / 92));
		        chkReels(i, Math.floor($reels[i].scrollTop / 92));
		    }

			start = undefined;
			
			determineWinnings();
			showPlayerStats();
			
		}
	}

	return {init: init}

})();

$(sm.init);