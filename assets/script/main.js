let grant = {
    health: 10,
    name: "Grant",
    attack: getDamage,
}

let player = {
    name: "",
    health: 40,
    wins: 0,
    attack: getPlayerDamage,
    heal: function () {
        if (player.healCount < 2) {
            player.health = player.health + getRandomIntInclusive(1, 10);
            player.healCount = player.healCount + 1
        };
    },
    healCount: 0,
}


function getPlayerDamage() {
    return getRandomIntInclusive(1, 3);
}

function getDamage() {
    return getRandomIntInclusive(1, 5);
}

function playerAttack () {
    grant.health = grant.health - player.attack();

}

function executeRound() {
    console.log("player Health", player.health, "grant health", grant.health, "player wins", player.wins, "player heal count", player.healCount, );
/*     } else if (userAnswer === "heal") {
        player.heal();
    }

    else {
        return;
    } */

    player.health = player.health - grant.attack();
    if (player.health <= 0) {
        console.log("you lost!");
        return;
    }
    if (grant.health <= 0) {
        grant.health = 10;
        player.wins = player.wins + 1
        var roundsLeft = 3 - player.wins;

        var roundDisplay = document.getElementById("display-round");
        roundDisplay.innerHTML = ("<p>" + roundsLeft + " Round(s) Left</p>");

        var grantsLosses = document.getElementById("grant-losses-count");
        grantsLosses.innerHTML = (player.wins);

        var playerWins = document.getElementById("player-wins-count");
        playerWins.innerHTML = (player.wins);

    }
    if (player.wins >= 3) {
        console.log("player wins")
        return;
    }
}



function startGame() {

    // User is prompted to play the game

    var start = prompt("Do you want to play?");

    console.log(start);

    // If yes, user is prompted to enter their name
    if (start === "yes") {
        player.name = prompt("Enter your name");
        console.log(player.name);


    } else {
        console.log("quit");
    }
    //If no, quit
};


var startBtn = document.getElementById("start-game");
startBtn.onclick = startGame;

var attackBtn = document.getElementById("attack");
attackBtn.onclick = function () {
    playerAttack();
    executeRound();
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}










