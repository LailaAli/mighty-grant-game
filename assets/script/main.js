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
var playerHp = document.getElementById("player-hp-display");
var displayCurrentEvent = document.getElementById("display-text");



function getPlayerDamage() {
    return getRandomIntInclusive(1, 3);
}

function getDamage() {
    return getRandomIntInclusive(1, 5);
}

function playerAttack() {
    grant.health = grant.health - player.attack();
}


function executeRound() {
    console.log("player Health", player.health, "grant health", grant.health, "player wins", player.wins, "player heal count", player.healCount, );
    
    player.health = player.health - grant.attack();
    if (player.health <= 0) {
        displayCurrentEvent.innerHTML = (player.name + ", my brave hero, you've lost!");
        console.log("you lost!");
        return;
    }

    if (grant.health <= 0) {
        grant.health = 10;
        player.wins = player.wins + 1
        var roundsLeft = 3 - player.wins;

        //Update Displays
        var roundDisplay = document.getElementById("display-round");
        roundDisplay.innerHTML = ("<p>" + roundsLeft + " Round(s) Left</p>");       //Displays how many rounds are left      

        var grantsLosses = document.getElementById("grant-losses-count");
        grantsLosses.innerHTML = (player.wins);                                                            //Displays how many times Grant lost

        var playerWins = document.getElementById("player-wins-count");
        playerWins.innerHTML = (player.wins);                                                               //Displays how many times player won
    }

    if (player.wins >= 3 ) {
        displayCurrentEvent.innerHTML = (player.name + ", my brave hero, you've won!");
        console.log("player wins")
    } 
}

function startGame() {
    var start = prompt("Do you want to play?");

    // If yes, user is prompted to enter their name
    if (start === "yes") {
        player.name = prompt("Enter your name");
        console.log(player.name);

    } else {
        console.log("quit");
    }
};

//Start Game Button Function
var startBtn = document.getElementById("start-game");
startBtn.onclick = startGame;

//Attack Button Function
var attackBtn = document.getElementById("attack");
attackBtn.onclick = function () {
    playerAttack();
    executeRound();
    playerHp.textContent = (player.health);         //Displays player's health points
    var grantHealth = document.getElementById("grant-hp-display");
    grantHealth.textContent = (grant.health);           //Displays Grant's health points
    displayCurrentEvent.innerHTML = (player.name + ", Grant attacked you! What would you like to do?");
}

//Heal Button Function
var healBtn = document.getElementById("heal");
healBtn.onclick = function () {
    player.heal();
    playerHp.textContent = (player.health);         //Displays player's health points
    var playerHealthCountUsed = document.getElementById("player-hc-display");
    playerHealthCountUsed.textContent = (player.healCount = 2 - player.healCount);         //Displays player's health count left
}

//Flee Button Function
var fleeBtn = document.getElementById("quit");
fleeBtn.onclick = function () {
    displayCurrentEvent.innerHTML = ("You fled! Try again when you are better prepared!");
    return;
}




function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
