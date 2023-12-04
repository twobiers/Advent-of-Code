"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

//
// YOUR CODE HERE
//
const gameInfo = INPUT.map(line => {
    const gameId = line.split(":")[0].split("Game ")[1];
    const draws = line.split(":")[1].split(";")
        .map(set => set.trim().split(",").reduce((acc, curr) => {
            const split = curr.trim().split(" ");
            acc[split[1]] = Number(split[0]);
            return acc;
        }, {}));
    return {
        gameId,
        draws
    }
});
const limits = {
    red: 12,
    green: 13,
    blue: 14
};
const result = gameInfo
    .filter(game => game.draws.every(draw => Object.entries(draw).every(([color, value]) => limits[color] >= value)))
    .reduce((acc, curr) => acc + Number(curr.gameId), 0);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
