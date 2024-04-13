#!/usr/bin/env node
import inquirer from "inquirer";
let pinNumber = 1234;
let amount = 50000;
console.log("Welcome to the ATM machine");

let pinAnswer = await inquirer.prompt([{
    name: "pin",
    message: "Enter your pin code",
    type: "number",
}]);

if (pinAnswer.pin === pinNumber) {
    console.log("Pin is correct. You are logged in successfully");

    let operationAnswer = await inquirer.prompt([{
        name: "operations",
        type: "list",
        message: "Select an operation:",
        choices: ["withdrawamount", "checkbalance"],
    }]);

    if (operationAnswer.operations === "withdrawamount") {
        let withdrawns = await inquirer.prompt([{
            name: "withdrawlmethod",
            type: "list",
            message: "select payment method",
            choices: ["fast cash", "enteramount"],
        }]);

        if (withdrawns.withdrawlmethod === "fast cash") {
            let fast = await inquirer.prompt([{
                name: "fastcash",
                type: "list",
                message: "select amount",
                choices: [10000, 20000, 30000, 40000, 50000, 60000, 70000]
            }]);
            if (fast.fastcash > amount) {
                console.log("you have insufficient balance");
            } else {
                amount -= fast.fastcash;
                console.log(`${fast.fastcash} withdrawn successfully`);
                console.log(`your remaining balance is ${amount}`);
            }

        } else if (withdrawns.withdrawlmethod === "enteramount") {
            let askAmount = await inquirer.prompt([{
                name: "amount",
                type: "number",
                message: "Enter the amount to withdraw",
            }]);

            if (askAmount.amount > amount) {
                console.log("You have insufficient balance");
            } else {
                amount -= askAmount.amount;
                console.log(`${askAmount.amount} withdrawn successfully`);
                console.log(`Your remaining balance is ${amount}`);
            }
        }
    } else if (operationAnswer.operations === "checkbalance") {
        console.log(`Your current balance is ${amount}`);
    }
} else {
    console.log("You have entered an incorrect pin code. Exiting...");
}
