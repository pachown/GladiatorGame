let gameContainer = document.getElementById(".Game-Container");

//4 options
let $option1 = $("#Option1");
let $option2 = $("#Option2");
let $option3 = $("#Option3");
let $option4 = $("#Option4");

//character stats
let $attack = $("#Gladiator_Attack");
let $health = $("#Gladiator_Health");
let $regeneration = $("#Gladiator_Regeneration");
let $armor = $("#Gladiator_Armor");
let level = $("#Gladiator_Level");
let skillpoints = $("#Gladiator_Skillpoint");

//Visually changing divs
let messageBoard = $("#Message-Board");
let visual1 = document.getElementById(".Visual1");
let visual2 = document.getElementById(".Visual2");

class Gladiator {
    constructor(health = 10, attack = 10, regeneration = 1, armor = 1) {
        this.health = health;
        this.attack = attack;
        this.regeneration = regeneration;
        this.armor = armor;
        this.level = 1;
        this.skillpoints = 1;
    }
}

let state = {
    //All things that can change go in here
    gladiator: new Gladiator(),
    menu: "main",
    

}

createCharacter = function(choice) {
    const characters = {
        'fat': (15, 8, 3, 1, 1),
        'strong': (12, 15, 2, 1),
        'rich': (10, 10, 1, 1),
        'godlike': (50, 50, 10, 10)
    }
    console.log(characters[choice] + ' hello ' + choice)
    let gladiator = new Gladiator(characters[choice])
    return gladiator;
}

let foes = {
    "easy": {
        glad: new Gladiator(4, 3, 0, 1)
    },
    "medium": {
        glad: new Gladiator(6, 4, 0, 2)
    },
    "hard": {
        glad: new Gladiator(10, 6, 0, 3)
    },
    "champion": {
        glad: new Gladiator(20, 15, 0, 5)
    }
}

fight = function(player, foe) {
    foeAttack = player.attack - foe.armor
    playerAttack = foe.attack - player.armor
    player.health = foeAttack;
    foe.health = playerAttack;
    if (player.health < 0) {
        EndGame()
    }
    return(`Your gladiator loses ${foeAttack} health leaving you with ${player.health} health.`, `Your foe loses ${playerAttack} health leaving him with ${foe.health}`)
}

randomizeWeather = function() {
    let options = {
        0 : "health",
        1 : "attack",
        2 : "regeneration",
        3 : "armor",
        4 : "level"
    }
    let weatherOption = options[Math.floor(Math.random(5))];
    return(weatherOption);
}

levelup = function(character) {
    character.level++;
    character.health+=2;
    character.skillpoints++;
}

postToBoard = function(text){
    $("#Message-Board").prepend(`<p>${text}<p>`);
}

updateStats = function(stats) {
    console.log("stats: " + stats, "state: " + state);
    $health = stats.health;
    $attack = stats.attack;
    $regeneration = stats.regeneration;
    $armor = stats.armor;
    $level = stats.level;
    $skillpoints = stats.skillpoints;
}
 
let mainMenu = function() {
    state.menu = "main"
    $option1.text("Glutton - Health & Regen");
    $option2.text("Hercules - Strength");
    $option3.text("Politician - Money");
    $option4.text("Zeus - Champ Status");

    let gladiator;
    $option1.click((e) => {
        gladiator = createCharacter('fat');
        postToBoard('You chose the Glutton');
    })
    $option2.click((e) => {
        gladiator = createCharacter('strong');
        postToBoard('You chose Hercules')
    })
    $option3.click((e) => {
        gladiator = createCharacter('rich');
        postToBoard('You chose the Politician')

    })
    $option4.click((e) => {
        gladiator = createCharacter('godlike');
        postToBoard('You chose ZEUS. The real God of THUNDER.')
    })
    console.log("Gladiator in creation: " + gladiator)
    state.gladiator = gladiator;
    updateStats(state.gladiator);
    //display new message to messageboard
    //replace visuals with game logo
    //create 
    //go to trainingScreen 
}

let trainingScreen = function() {

}

let difficultyScreen = function() {

}

let victoryScreen = function() {

}

let defeatScreen = function() {

}

mainMenu();

//function that creates an end game screen
// EndGame()



    //flow:
    //1. Menu screen that has character options
    //2. Training screen where you level up your fighter's stats once per skillpoint
    //3. Choose the difficulty of your next fight
    //3. Battle screen when fight calculation is done
    //4. Victory screen -> Back to training screen
    //5. Defeat screen -> Back to main menu
