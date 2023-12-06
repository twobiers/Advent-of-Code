"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

//
// YOUR CODE HERE
//
const calculateDistance = (buttonPressingTime, timeLimit) => buttonPressingTime * (timeLimit - buttonPressingTime);

const time = Number(INPUT[0].split(":")[1].trim().replace(/\s+/g, ''));
const distance = Number(INPUT[1].split(":")[1].trim().replace(/\s+/g, ''));

const fasterPressingTimes = [];

for (let i = 0; i < time; i++) {
    const dist = calculateDistance(i, time);
    if (dist > distance) fasterPressingTimes.push(i);
    if (fasterPressingTimes.length > 0 && dist <= distance) break;
}

const result = fasterPressingTimes.length;

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
