"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const buildSequence = (arr) => {
    const sequence = [];
    for (let i = 0; i < arr.length - 1; i++) {
        const num1 = Number(arr[i]);
        const num2 = Number(arr[i + 1]);
        sequence.push(num2 - num1);
    }
    return sequence;
};
const isZeroSequence = (arr) => arr.every((num) => num === 0);
const createSequences = (arr) => {
    const sequences = [arr];
    while (!isZeroSequence(sequences[sequences.length - 1])) {
        sequences.push(buildSequence(sequences[sequences.length - 1]));
    }
    return sequences;
};
const extrapolate = (arr) => {
    arr[arr.length - 1].unshift(0);
    for (let i = arr.length - 2; i >= 0; i--) {
        arr[i].unshift(arr[i][0] - arr[i + 1][0]);
    }
    return arr;
}

const sequences = INPUT
    .map((line) => extrapolate(createSequences(line.split(" ").map(Number))));
console.log(sequences)

const result = sequences.reduce((acc, cur) => acc + cur[0][0], 0);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
