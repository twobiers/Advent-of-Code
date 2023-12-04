"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input-test.txt"))).trim().split("\n");

const pStart = performance.now();

//
// YOUR CODE HERE
//
const numbers = INPUT.map(l => {
    const cardId = Number(l.split(":")[0].split(" ")[1]);
    const numberSplit = l.split(":")[1].split("|");
    const winningNumbers = numberSplit[0].trim().split(" ");
    const myNumbers = numberSplit[1].trim().split(" ");
    return {
        cardId, winningNumbers, myNumbers
    }
});
const cardCounts = {}
for (let i = 0; i < numbers.length; i++) {
    const element = numbers[i];
    const s = element.myNumbers.filter(n1 => element.winningNumbers.includes(n1)).filter(it => !!it).length;

    // Played card added
    if (cardCounts[element.cardId] === undefined) cardCounts[element.cardId] = 1;

    // Adding copies
    for (let j = 1; j <= s; j++) {
        const copyCardId = element.cardId + j
        if (cardCounts[copyCardId] === undefined) cardCounts[copyCardId] = cardCounts[element.cardId] + 1;
        else cardCounts[copyCardId] += cardCounts[element.cardId];
    }
}

// Note: I did something wrong during refactoring. Now it doesn't work anymore and I don't want to invest more time
const result = Object.values(cardCounts).reduce((acc, curr) => acc + curr, 0);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
