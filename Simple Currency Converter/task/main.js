const input = require('sync-input');

function askCurrency(direction) {
    let currency = input(direction);
    currency = currency.toUpperCase();
    let array = ["JPY", "EUR", "RUB", "USD", "GBP"];
    if (array.includes(currency) === false) {
        console.log("Unknown currency");
        return null;
    }
    return currency;
}

function askAmount() {
    let amount = input("Amount: ");
    if (isNaN(amount)) {
        console.log("The amount has to be a number");
        return null;
    }
    if (amount < 1) {
        console.log("The amount cannot be less than 1");
        return null;
    }
    return Number(amount);
}

function convertToUSD(currencyFrom, amount) {
    let amountUSD;
    switch (currencyFrom) {
        case "JPY":
            amountUSD = amount/113.5;
            break;
        case "EUR":
            amountUSD = amount/0.89;
            break;
        case "RUB":
            amountUSD = amount/74.36;
            break;
        case "GBP":
            amountUSD = amount/0.75;
            break;
        case "USD":
            amountUSD = amount;
            break;
        default:
            console.log("error");
            break;
    }
    return amountUSD;
}

function convertFromUSD(currency, amount) {
    let newAmount;
    if (currency === "JPY") {
        newAmount = 113.5 * amount;
    } else if (currency === "EUR") {
        newAmount = 0.89 * amount;
    } else if (currency === "RUB") {
        newAmount = 74.36 * amount;
    } else if (currency === "GBP") {
        newAmount = 0.75 * amount;
    } else {
        newAmount = amount;
    }
    return newAmount;
}
function printResult(amountFrom, currencyFrom, amountTo, currencyTo) {
    let newAmountFix = amountTo.toFixed(4);
    console.log(`Result: ${amountFrom} ${currencyFrom} equals ${newAmountFix} ${currencyTo}`);
}

function mainLoop() {
    let option;
    do {
        console.log("What do you want to do?");
        console.log("1-Convert currencies 2-Exit program");
        option = Number(input());
        if (option === 1) {
            while (!convertCurrencies()) {
            };
        } else if (option === 2) {
            console.log("Have a nice day!");
        } else {
            console.log("Unknown input");
        }
    } while (option !== 2);
}

function convertCurrencies() {
    console.log("What do you want to convert?");
    let currencyFrom = askCurrency("From: ");
    if (currencyFrom === null) {
        return false;
    }
    let currencyTo = askCurrency("To: ");
    if (currencyTo === null) {
        return false;
    }
    let amount = askAmount();
    if (amount === null) {
        return false;
    }
    let amountUSD = convertToUSD(currencyFrom, amount);
    let amountResult = convertFromUSD(currencyTo, amountUSD);
    printResult(amount, currencyFrom, amountResult, currencyTo);
    return true;
}

console.log("Welcome to Currency Converter!");
console.log("1 USD equals 1 USD");
console.log("1 USD equals 113.5 JPY");
console.log("1 USD equals 0.89 EUR");
console.log("1 USD equals 74.36 RUB");
console.log("1 USD equals 0.75 GBP");

mainLoop();