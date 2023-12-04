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
const minCubes = gameInfo
    .map(g => {
        const colors = [...new Set(g.draws.map(Object.keys).flat())];
        return Object.fromEntries(
            colors.map(c => [c, Math.max(...g.draws.map(d => d[c] || 0))])
        )
    });
const result = minCubes.reduce((acc, curr) => acc + Object.values(curr).reduce((acc, curr) => acc * curr), 0);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
