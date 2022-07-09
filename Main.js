//character stats
let $attack = $("#Gladiator_Attack");
let $health = $("#Gladiator_Health");
let $regeneration = $("#Gladiator_Regeneration");
let $armor = $("#Gladiator_Armor");
let $level = $("#Gladiator_Level");
let $skillpoints = $("#Gladiator_Skillpoint");

//Visually changing divs
let $allMenus = $(".Options-Container")
let $mainMenu = $("#Main_Menu_Options");
let $trainingMenu = $("#Training_Menu_Options");
let $skillupMenu = $("#Skillup_Menu_Options");
let $weaponsMenu = $("#Weapons_Menu_Options");
let $armorMenu = $("#Armor_Menu_Options");
let $BattleMenu = $("#Battle_Menu_Options");
let $difficultyMenu = $("#Difficulty_Menu_Options");
let $victoryMenu = $("#Victory_Menu_Options");
let $defeatMenu = $("#Defeat_Menu_Options");

let $visual1 = document.getElementById(".Visual1");
let $visual2 = document.getElementById(".Visual2");

let Gladiator = class Gladiator {
    constructor(health = 10, attack = 10, regeneration = 1, armor = 1) {
        this.health = health;
        this.currentHealth = this.health;
        this.attack = attack;
        this.regeneration = regeneration;
        this.armor = armor;
        this.level = 1;
        this.skillpoints = 1;
    }
}

let state = {
    gladiator: undefined,
    menu: "main",
    opponent: undefined

}

createCharacter = function(choice) {
    const characters = {
        "Thicc McGumbles": (15, 8, 3, 1),
        "Hercules Strongbad": (12, 15, 2, 1),
        "Aurelius": (10, 10, 1, 1),
        "Zeus": (50, 50, 10, 10)
    }
    let gladiator = new Gladiator(characters[choice]);
    console.log(choice, characters[choice], characters["Zeus"])
    state.gladiator = gladiator;
    postToBoard(`Hiring ${choice}`);
    updateStats(state.gladiator);
    trainingMenu();
}

createFoe = function(choice) {
    const foes = {
        "easy": (4, 3, 0, 1),
        "medium": (6, 4, 0, 2),
        "hard": (10, 6, 0, 3),
        "god": (20, 15, 0, 5)
        }
        let gladiator = new Gladiator(foes[choice]);
        state.foe = gladiator;
        postToBoard(`Fighting ${choice}`);

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


levelup = function(character) {
    character.level++;
    character.health+=2;
    character.skillpoints++;
}

postToBoard = function(text){
    $("#Message-Board").prepend(`<p>${text}<p>`);
}

updateStats = function(stats) {
    $health.text("Health: " + stats.health);
    $attack.text("Attack: " + stats.attack);
    $regeneration.text("Regeneration: " + stats.regeneration);
    $armor.text("Armor: " + stats.armor);
    $level.text("Level: " + stats.level);
    $skillpoints.text("Skillpoints Left" + stats.skillpoints);
}

//MainMenu
//1. Set state
//2. Display current options menu
//3. 
var mainMenu = function() {
    state.menu = "main";
    $allMenus.hide();
    $mainMenu.show();
}

var trainingMenu = function() {
    state.menu = "training"
    $allMenus.hide();
    $trainingMenu.show();
}

var skillupMenu = function() {
    if (state.gladiator.skillpoints = 0){
        postToBoard(`Skillpoints required to level up`);
        trainingMenu();
    }
    state.menu = "skillup";
    $allMenus.hide();
    $skillupMenu.show();
    
}

var difficultyMenu = function() {
    state.menu = "difficulty";
    $allMenus.hide();
    $difficultyMenu.show();
}

var weaponsMenu = function() {
    state.menu = "weapons";
    $allMenus.hide();
    $weaponsMenu.show();
}

var armorMenu = function() {
    state.menu = "armor";
    $allMenus.hide();
    $armorMenu.show();
}

var battleMenu = function() {
    state.menu = "battle";
    $allMenus.hide();
    $battleMenu.show();
}

var victoryMenu = function() {
    state.menu = "victory";
    $allMenus.hide();
    $victoryMenu.show();
}

var defeatMenu = function() {
    state.menu = "defeat";
    $allMenus.hide();
    $defeatMenu.show();
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

// randomizeWeather = function() {
//     let options = {
//         0 : "health",
//         1 : "attack",
//         2 : "regeneration",
//         3 : "armor",
//         4 : "level"
//     }
//     let weatherOption = options[Math.floor(Math.random(5))];
//     return(weatherOption);
// }