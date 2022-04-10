const readline = require("readline");

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Variables used by everyone
let salary = 100;
let remainder;

// Variables used to calculate expenses
let expenseNames = [];
let expenseCosts = [];
let itemNumber = 0;
let totalCost = 0;

// Variables used to calculate exchange rate
let savingsGBP;
let currencyName = "GBP";
let currencyRate = 0.16;
let exchangeRate = {
  GBP: 0.16,
  CAD: 0.26,
};

// Variables used to calculate savings
let totalSavings = 0;
let savingsBRL = 50;

// Function to close interface
// Necessary because:
// A class can't call interface.close
const closeInterface = () => {
  interface.close();
  return;
};

// Class to caculate savings
// Static methods are necessary because:
// It needs to be able to call itself
// It needs to be able to reference its own vars
class Calculate {
  static calculateSavings() {
    // Loop through each month
    for (this.i = 0; this.i < 13; this.i++) {
      // i > 0 so it doesn't calculate a month 0
      if (this.i > 0) {
        this.brl = this.addSavings;
        this.gbp = this.convertToGBP;

        // Only add bonus every 6 months
        if (this.i % 6 == 0 && this.i != 13) {
          this.bonus = this.addBonus;
          this.gbp = this.convertToGBP;
          this.showConsole("bonus");
        }

        // Only show savings every 3 months
        if (this.i % 3 == 0) {
          this.showConsole("month");
        }
      }
    }

    closeInterface();
  }

  // Get methods
  static get addSavings() {
    return (totalSavings += savingsBRL);
  }

  static get addBonus() {
    return (totalSavings += salary);
  }

  static get convertToGBP() {
    return (totalSavings * currencyRate);
  }

  // Isolated method to show results in the console
  static showConsole(bonusOrMonth) {
    switch (bonusOrMonth) {
      case "month":
        console.log();
        console.log(
          `${this.i} months: ${totalSavings}BRL - ${this.gbp}${currencyName}`
        );
        console.log();
        console.log("------------------------------------------");
        break;

      case "bonus":
        console.log();
        console.log(`+Bonus: ${salary}BRL`);
        break;
    }
  }
}

const addCustomCurrency = () => {
  interface.question("Currency (all uppercase): ", (answer) => {
    currencyName = answer;

    interface.question(
      "How much does 1 BRL cost in that currency? (x.xx): ",
      (answer) => {
        currencyRate = parseInt(answer);

        exchangeRate[currencyName] = currencyRate;
        console.log();
        console.log("------------------------------------------");
        console.log(`You've chosen: ${currencyName} - ${answer}`);
        console.log("------------------------------------------");

        Calculate.calculateSavings();
      }
    );
  });
};

const useAvailableCurrency = () => {
  console.log();
  interface.question(
    "Choose a currency from that list (GBP is default): ",
    (currency) => {
      currencyRate = exchangeRate[currency];
      currencyName = currency;

      console.log();
      console.log("------------------------------------------");
      console.log(`You've chosen: ${currencyName} - ${currencyRate}`);
      console.log("------------------------------------------");

      console.log();
      console.log("------------------------------------------");

      Calculate.calculateSavings();
    }
  );
};

const askCurrency = () => {
  console.log();
  interface.question(
    "Use available currencies or add a new one? (available/custom): ",
    (answer) => {
      if (answer == "custom") addCustomCurrency();
      useAvailableCurrency();
    }
  );
};

const chooseCurrency = () => {
  console.log("Currencies available to convert:");
  console.log();

  // Loops through each currency
  Object.keys(exchangeRate).forEach((currency) => {
    console.log(currency);
  });

  askCurrency();
};

const result = () => {
  console.log();
  console.log("Your expenses are: ");
  console.log();
  console.log("-----------------------------------------");
  console.log();

  // Loops through each expense added by the user
  for (let i = 0; i < expenseNames.length; i++) {
    console.log(`${expenseNames[i]} - ${expenseCosts[i]}`);
    totalCost += parseInt(expenseCosts[i]);
  }

  remainder = salary - totalCost;
  savingsBRL = remainder;

  console.log();
  console.log("------------------------------------------");
  console.log();
  console.log(`Your budget is: ${salary}`);
  console.log();
  console.log("------------------------------------------");
  console.log();
  console.log(`Your total costs are: ${totalCost}`);
  console.log();
  console.log("------------------------------------------");
  console.log();
  console.log(`Your remainder is: ${remainder}`);
  console.log();
  console.log("------------------------------------------");
  console.log();
  console.log();
  console.log();
  console.log();
  console.log("This is how much you can save in a year:");
  console.log();
  console.log("------------------------------------------");

  chooseCurrency();
};

// Recursive function that keeps adding new expanses
// Until user decides to stop
const ask = () => {
  console.log();
  interface.question("Name an expense: ", (expenseName) => {
    console.log();
    console.log("------------------------------------------");

    expenseNames.push(expenseName);

    console.log();

    interface.question("Cost for that expense: ", (expenseCost) => {
      console.log();
      console.log("------------------------------------------");

      expenseCosts.push(expenseCost);

      console.log();
      console.log(
        `You've added ${expenseNames[itemNumber]} - ${expenseCosts[itemNumber]}`
      );
      console.log();

      console.log("------------------------------------------");
      console.log();

      interface.question("Finished expenses list? y/n: ", (answer) => {
        console.log("------------------------------------------");

        if (answer == "y" || answer == "Y") {
          console.log();
          console.log();
          console.log();
          console.log();

          result();
        }

        itemNumber++;
        ask();
      });
    });
  });
};

console.log("------------------------------------------");
console.log();

interface.question("Input your budget: ", (budget) => {
  console.log();
  console.log("------------------------------------------");

  salary = parseInt(budget);
  ask();
});

