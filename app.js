import readline from "readline";
import fs from "fs";
import chalk from "chalk";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const todos = [];


function showMenu() {
    console.log(chalk.bgYellow.blue.bold("\n1: Add a Task"));
    console.log(chalk.bgYellow.blue.bold("2: View Tasks"));
    console.log(chalk.bgYellow.blue.bold("3: View Previously saved tasks"));
    console.log(chalk.bgYellow.blue.bold('4. Save this tasks permenently'));
    console.log(chalk.bgYellow.blue.bold('5. Delete all tasks that are stored permenently'));
    console.log(chalk.bgYellow.blue.bold("6: Exit"));
    rl.question("Choose an option : ", handleInput);
}

function callShowMenu() {
    setTimeout(() => {
        showMenu()
    }, 2000);
}

function handleInput(answer) {
    if (answer === "1") {
        rl.question("Enter the task : ", (task) => {
            todos.push(task);
            console.log(chalk.green('Task added : ', task));
            callShowMenu();
        })
    } else if (answer === "2") {
        console.log('\n Your todo List : ');
        todos.forEach((task, index) => {
            console.log(chalk.bold.green(`${index + 1}.${task}`));
        })
        callShowMenu();
    } else if (answer === "3") {
        let data = fs.readFileSync("data.txt", "utf-8");
        if (data === "") {
            console.log(chalk.bold.red('No data found in your data file..'));
        } else {
            console.log(chalk.bold.blue(data));
        }
        callShowMenu();
    } else if (answer === "4") {
        let data = fs.readFileSync("data.txt", "utf-8");
        let dataArr = data.split("\n");
        let flag = 0;
        if (todos.length > 0) {
            todos.forEach((task, index) => {
                if (dataArr.includes(`${index + 1}.${task}`)) {
                    flag = 1;
                } else {
                    fs.appendFileSync("data.txt", `\n${index + 1}.${task}`);
                }
            })
            if (flag === 1) {
                console.log(chalk.bold.blue('Few Tast already exist and rest will be added'));
            }
            console.log(chalk.bold.green('Tasks stored permenently...'));
        } else {
            console.log(chalk.bold.red("You have not created any todos.."));
        }
        callShowMenu();
    } else if (answer === "5") {
        let data = fs.readFileSync("data.txt", "utf-8");
        if (data !== "") {
            fs.writeFileSync("data.txt", "");
            console.log(chalk.bold.green('File content deleted successfully..'));
        } else {
            console.log(chalk.bold.red('File is already empty'));
        }
        callShowMenu();
    } else if (answer === "6") {
        console.log(chalk.bold.blue('Good byee'));
        rl.close();
    } else {
        console.log(chalk.bold.red('Invalid option. Please try again.'));
        callShowMenu();
    }
}

showMenu();