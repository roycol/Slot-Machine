var credits = 1000;
var jackpot = 5000;
var bet = 0;
var winnerPaid = 0;


var turn = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

/* Utility function to show Player Stats */
function showPlayerStats() {
    credits = 1000;
    $("#jackpot").val(jackpot);
    $("#credits").val(credits);
    $("#bet").val(bet);
    $("#winnerPaid").val(winnerPaid);

    //winRatio = winNumber / turn;
    //$("#playerTurn").text("Turn: " + turn);
    //$("#playerWins").text("Wins: " + winNumber);
    //$("#playerLosses").text("Losses: " + lossNumber);
    //$("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
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
    $("div#winOrLose>p").text("You Won: $" + winnerPaid);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    credits -= bet;
    $("div#winOrLose>p").text("You Lost!");
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

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnerPaid, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnerPaid = bet * 10;
        }
        else if (bananas == 3) {
            winnerPaid = bet * 20;
        }
        else if (oranges == 3) {
            winnerPaid = bet * 30;
        }
        else if (cherries == 3) {
            winnerPaid = bet * 40;
        }
        else if (bars == 3) {
            winnerPaid = bet * 50;
        }
        else if (bells == 3) {
            winnerPaid = bet * 75;
        }
        else if (sevens == 3) {
            winnerPaid = bet * 100;
        }
        else if (grapes == 2) {
            winnerPaid = bet * 2;
        }
        else if (bananas == 2) {
            winnerPaid = bet * 2;
        }
        else if (oranges == 2) {
            winnerPaid = bet * 3;
        }
        else if (cherries == 2) {
            winnerPaid = bet * 4;
        }
        else if (bars == 2) {
            winnerPaid = bet * 5;
        }
        else if (bells == 2) {
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
            showPlayerStats();
        }
    }
    else if (bet > credits) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (bet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (bet <= credits) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }

}



/*
	Slot Machine
*/
var sm = (function(undefined){

	var tMax = 3000, // animation time, ms
		height = 280,
		speeds = [],
		r = [],
		reels = [
			['<img src="assets/images/icon/banana.png" />',   '<img src="assets/images/icon/bar.png" />',       '<img src="assets/images/icon/bigwin.png" />'],
			['<img src="assets/images/icon/lemon.png" />',  '<img src="assets/images/icon/orange.png" />', '<img src="assets/images/icon/peach.png" />'],
			['<img src="assets/images/icon/plum.png" />', '<img src="assets/images/icon/seven.png" />', '<img src="assets/images/icon/watermelon.png" />']
		],
		$reels,
		start;

	function init(){
		$reels = $('.reel').each(function(i, el){
			el.innerHTML = '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div>'
		});
        
		$('#btnSpin').click(action);
	}

	function action(){
		if (start !== undefined) return;

		for (var i = 0; i < 3; ++i) {
			speeds[i] = Math.random() + .5;	
			r[i] = (Math.random() * 3 | 0) * height / 3;
			alert(r[i]);
		}

		animate();
	}

	function animate(now){
		if (!start) start = now;
		var t = now - start || 0;

		for (var i = 0; i < 3; ++i)
			$reels[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + r[i]) % height | 0;

		if (t < tMax)
			requestAnimationFrame(animate);
		else {
			start = undefined;
			check();
		}
	}

	//function check(){
	//	alert(
	//		r[0] === r[1] && r[1] === r[2] ?
	//			'You won! Enjoy your ' + reels[1][ (r[0] / 70 + 1) % 3 | 0 ].split(' ')[0]
	//		:
	//			'Try again'
	//	);
	//}

	return {init: init}

})();

$(sm.init);