const input = require('sync-input')

let coffeeType = [{'water': 250, 'milk': 0, 'beans': 16, 'cost': 4},
    {'water': 350, 'milk': 75, 'beans': 20, 'cost': 7},
    {'water': 200, 'milk': 100, 'beans': 12, 'cost': 6}];

const machine = { water: 400, milk: 540, beans: 120, cups: 9, money: 550}

function remaining() {
    console.log(`
The coffee machine has:
${machine.water} ml of water
${machine.milk} ml of milk
${machine.beans} g of coffee beans
${machine.cups} disposable cups
$${machine.money} of money
`)
}

function chooseAction() {
    this.choice = true;
    while (this.choice) {
        this.choice = input(`Write action (buy, fill, take, remaining, exit):
`);
        switch (this.choice) {
            case "buy":
                console.log(`
What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:`);
                let coffeeChoice = input();
                makeCoffee(coffeeChoice);
                break;
            case "fill":
                fill();
                break;
            case "take":
                take()
                break;
            case "remaining":
                remaining();
                break;
            case "exit":
                this.choice = false;
                return;
        }
    }
}

function makeCoffee(coffeeChoice) {
    if (coffeeChoice !== "back") {
        coffeeChoice -= 1;
        if (machine.water < coffeeType[coffeeChoice].water) {
            console.log("Sorry, not enough water!\n");
        } else if (machine.milk < coffeeType[coffeeChoice].milk) {
            console.log("Sorry, not enough milk!\n");
        } else if (machine.beans < coffeeType[coffeeChoice].beans) {
            console.log("Sorry, not enough coffee beans!\n");
        } else if (machine.cups < coffeeType[coffeeChoice].cups) {
            console.log("Sorry, not enough cups!\n");
        } else {
            console.log(`I have enough resources, making you a coffee!
            `);
            machine.water -= coffeeType[coffeeChoice].water;
            machine.milk -= coffeeType[coffeeChoice].milk;
            machine.beans -= coffeeType[coffeeChoice].beans;
            machine.money += coffeeType[coffeeChoice].cost;
            machine.cups -= 1;
        }
    }
}

function fill() {
    console.log(`
Write how many ml of water you want to add:`)
    let addWater = Number(input());
    machine.water += addWater;
    console.log(`Write how many ml of milk you want to add:`)
    let addMilk = Number(input());
    machine.milk += addMilk;
    console.log(`Write how many grams of coffee beans you want to add:`)
    let addBeans = Number(input());
    machine.beans += addBeans;
    console.log(`Write how many disposable cups you want to add:`)
    let addCups = Number(input());
    console.log(" ");
    machine.cups += addCups;
}

function take() {
    console.log(`I gave you $${machine.money}`)
    machine.money = 0;
}


chooseAction()
