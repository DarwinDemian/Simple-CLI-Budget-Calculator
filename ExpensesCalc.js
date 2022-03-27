const readline = require("readline");

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let salary = 0;
let expenseNames = [];
let expenseCosts = [];
let itemNumber = 0;

const result = () => {
  let totalCost = 0;

  console.log();
  console.log("Your expenses are: ");
  console.log();
  console.log("---------------------------------");
  console.log();

  for (let i = 0; i < expenseNames.length; i++) {
    console.log(`${expenseNames[i]} - ${expenseCosts[i]}`);
    totalCost += parseInt(expenseCosts[i]);
  }

  console.log();
  console.log("---------------------------------");
  console.log();
  console.log(`Your budget is: ${salary}`);
  console.log();
  console.log("---------------------------------");
  console.log();
  console.log(`Your total costs are: ${totalCost}`);
  console.log();
  console.log("---------------------------------");
  console.log();
  console.log(`Your remainder is: ${salary - totalCost}`);
  console.log();
  console.log("---------------------------------");
};

const ask = () => {
  console.log();
  interface.question("Name an expense: ", (expenseName) => {
    console.log();
    console.log("---------------------------------");
    expenseNames.push(expenseName);
    console.log();

    interface.question("Cost for that expense: ", (expenseCost) => {
      console.log();
      console.log("---------------------------------");

      expenseCosts.push(expenseCost);
      console.log();
      console.log(
        `You added ${expenseNames[itemNumber]} - ${expenseCosts[itemNumber]}`
      );
      console.log();

      console.log("---------------------------------");
      console.log();

      interface.question("Finished expenses list? y/n: ", (answer) => {
        console.log();
        console.log("---------------------------------");

        if (answer == "y") {
          result();
          interface.close();
          return;
        }

        itemNumber++;
        ask();
      });
    });
  });
};

console.log("---------------------------------");
console.log();
interface.question("Input your budget: ", (budget) => {
  console.log();
  console.log("---------------------------------");

  salary = budget;
  ask();
});
