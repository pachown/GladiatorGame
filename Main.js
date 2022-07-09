//character stats
let $attack = $("#Gladiator_Attack");
let $health = $("#Gladiator_Health");
let $regeneration = $("#Gladiator_Regeneration");
let $armor = $("#Gladiator_Armor");
let $level = $("#Gladiator_Level");
let $skillpoints = $("#Gladiator_Skillpoints");
let $money = $("#Player_Money")

//Visually changing divs
let $allMenus = $(".Options-Container")
let $mainMenu = $("#Main_Menu_Options");
let $trainingMenu = $("#Training_Menu_Options");
let $skillupMenu = $("#Skillup_Menu_Options");
let $weaponsMenu = $("#Weapons_Menu_Options");
let $armorMenu = $("#Armor_Menu_Options");
let $battleMenu = $("#Battle_Menu_Options");
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
        this.skillpoints = 100;
        this.armorFromItems = 0;
        this.attackFromItems = 0;
    }
}

let state = {
    gladiator: undefined,
    menu: "main",
    opponent: undefined,
    money: 1000

}

createCharacter = function(choice) {
    const characters = {
        "Thicc McGumbles": new Gladiator(15, 8, 3, 1),
        "Hercules Strongbad": new Gladiator(12, 15, 2, 1),
        "Aurelius": new Gladiator(10, 10, 1, 1),
        "Zeus": new Gladiator(50, 50, 10, 10)
    }
    let gladiator = characters[choice];
    state.gladiator = gladiator;
    postToBoard(`Hiring ${choice}`);
    updateStats(state.gladiator);
    trainingMenu();
}

createFoe = function(choice) {
    const foes = {
        "Facilis Proelium": new Gladiator(4, 3, 0, 1),
        "Regularis Proelium": new Gladiator(6, 4, 0, 2),
        "Durum Proelium": new Gladiator(10, 6, 0, 3),
        "Deus Maximus": new Gladiator(75, 15, 0, 5)
        }
        let gladiator = foes[choice];
        state.foe = gladiator;
        postToBoard(`Fighting ${choice}`);
}

battleStart = function(choice){
    createFoe(choice);
    battleMenu();
}

fight = function(choice) {
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

skillup = function(choice){
    let options = {
        health: `Your health went up to ${state.gladiator.health + 1}`,
        attack: `Your attack went up to ${state.gladiator.attack + 1}`,
        regeneration: `Your regeneration went up to ${state.gladiator.regeneration + 1}`,
        money: `Your money went up to ${state.money + 1}`
    }
    if(choice !== "money"){
        state.gladiator[choice]++;
    } else {
        state.money += 3;
    }
    state.gladiator.skillpoints--;
    updateStats(state.gladiator);
    postToBoard(options[choice]);
    skillupMenu();
}

postToBoard = function(text){
    $("#Message-Board").prepend(`<p>${text}<p>`);
}

updateStats = function(stats) {
    $health.text("Health: " + stats.health);
    $attack.text("Attack: " + stats.attack + " + " + stats.attackFromItems);
    $regeneration.text("Regeneration: " + stats.regeneration);
    $armor.text("Armor: " + stats.armor + " + " + stats.armorFromItems);
    $level.text("Level: " + stats.level);
    $skillpoints.text("Skillpoints Left: " + stats.skillpoints);
    $money.text("Money: " + state.money);
}

buyItem = function(attack, armor, cost, name){
    if (state.money < cost){
        postToBoard('You do not have enough money for that.');
        return;
    }
    let change = attack > 0 ? `Attack by ${attack}` : `Armor by ${armor}`;
        if(attack > 0) {
            state.gladiator.attackFromItems = attack;
        } else {
            state.gladiator.armorFromItems = armor;
        }
        state.money -= cost;
    postToBoard(`You purchased the ${name} for $${cost}. It increased your ${change}`)
    updateStats(state.gladiator);
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
    if (state.gladiator.skillpoints <= 0){
        postToBoard(`Skillpoints required to level up`);
        trainingMenu();
        return;
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