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
        this.maxHealth = health;
        this.attack = attack;
        this.regeneration = regeneration;
        this.armor = armor;
        this.level = 1;
        this.skillpoints = 2;
        this.armorFromItems = 0;
        this.attackFromItems = 0;
    }
}

let state = {
    gladiator: undefined,
    menu: "main",
    foe: undefined,
    money: 10

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
    if(choice === "Aurelius"){
        state.money += 20;
        postToBoard("Aurelius adds $20 to your account")
    }
    updateStats();
    trainingMenu();
}

createFoe = function(choice) {
    const foes = {
        "Facilis Proelium": new Gladiator(4, 3, 1, 1),
        "Regularis Proelium": new Gladiator(6, 4, 2, 2),
        "Durum Proelium": new Gladiator(25, 12, 3, 3),
        "Deus Maximus": new Gladiator(75, 25, 4, 5)
        }
        let foe = foes[choice];
        state.foe = foe;
        postToBoard(`Fighting ${choice}`);
}

battleStart = function(choice){
    createFoe(choice);
    battleMenu();
}

fight = function(attBoost, defBoost, regenBoost, moneyBoost) {
    pAttack  = state.gladiator.attack + state.gladiator.attackFromItems;
    pDef = state.gladiator.armor + state.gladiator.armorFromItems + state.gladiator.regeneration;
    if (attBoost) {
        pAttack = pAttack * attBoost;
    }
    if (defBoost) {
        pDef = pDef * defBoost;
    }
    if (regenBoost) {
        pDef = pDef + regenBoost;
    }
    if (moneyBoost){
        state.money += 2;
        postToBoard(`You give the crowd a show and they toss you roses and gold coins`);
        updateStats();
    }
    fAttack = state.gladiator.attack;
    fDef = state.foe.armor + state.foe.regeneration;
    pDamageCalc = fAttack - pDef;
    if (pDamageCalc < 0) {  pDamageCalc = 0 };
    fDamageCalc = pAttack - fDef;
    if (fDamageCalc < 0) {  fDamageCalc = 0 };
    state.gladiator.health -= pDamageCalc;
    state.foe.health -= fDamageCalc;
    // console.log("Fight Stats. pAttack " + pAttack + " pDef " + pDef + " fAttack " + fAttack + " fDef " + fDef + " pDamCalc: " + pDamageCalc + " fDamCalc: " + fDamageCalc);

    let playerInfo = `Your gladiator loses ${pDamageCalc} health leaving you with ${state.gladiator.health} health.`;
    let foeInfo = `Your foe loses ${fDamageCalc} health leaving him with ${state.foe.health}`
    postToBoard(playerInfo);
    postToBoard(foeInfo);
    updateStats();
    if (state.gladiator.health <= 0) {
        defeatMenu();
        return;
    }
    if (state.foe.health <= 0) {
        victoryMenu();
        return;
    }
}


levelup = function(character) {
    character.level++;
    character.health=character.maxHealth+2;
    character.maxHealth+=2;
    character.skillpoints++;
    postToBoard("You won the battle and level up!")
    postToBoard(`Gladiator level increased to ${character.level}. Gladiator health increased to ${character.health}. Skillpoint added`);
    updateStats();
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
    if(choice = "health"){
        state.gladiator.maxHealth++;
    }
    state.gladiator.skillpoints--;
    updateStats();
    postToBoard(options[choice]);
    skillupMenu();
}

postToBoard = function(text){
    $("#Message-Board").prepend(`<p>${text}<p>`);
}

updateStats = function() {
    stats = state.gladiator
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
    updateStats();
}

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
    levelup(state.gladiator);
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