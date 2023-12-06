"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const calculateDistance = (buttonPressingTime, timeLimit) => buttonPressingTime * (timeLimit - buttonPressingTime);

const times = INPUT[0].split(":")[1].trim().split(/\s+/g).map(Number);
const distances = INPUT[1].split(":")[1].trim().split(/\s+/g).map(Number);
console.assert(times.length === distances.length);

const fasterPressingTimes = [];
for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    fasterPressingTimes[i] = [];


    for (let j = 0; j < time; j++) {
        const dist = calculateDistance(j, time);
        if (dist > distance) fasterPressingTimes[i].push(j);
    }
}
const result = fasterPressingTimes.reduce((acc, curr) => acc * curr.length, 1);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
