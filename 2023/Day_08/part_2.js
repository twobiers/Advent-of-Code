"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const nodes = {};
INPUT.splice(2).forEach(i => {
    const id = i.split("=")[0].trim();
    const edgeCandiates = i.split("=")[1].trim();
    const edges = edgeCandiates.substring(1, edgeCandiates.length - 1).split(", ");
    nodes[id] = edges;
});

const directions = [...INPUT[0]];

const startNodes = Object.keys(nodes).filter(n => n.endsWith("A"));
const count = [];

for (let i = 0; i < startNodes.length; i++) {
    let currentNode = startNodes[i];
    count[i] = 0;

    do {
        const idx = count[i] % directions.length;
        const dir = directions[idx];
        const newDirIdx = dir === "L" ? 0 : 1;

        currentNode = nodes[currentNode][newDirIdx];
        count[i]++;
    } while (!currentNode.endsWith("Z"))
}

const gcd = (a, b) => !b ? a : gcd(b, a % b);
const lcm = (a, b) => (a * b) / gcd(a, b);

const result = count.reduce((a, b) => lcm(a, b));
const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
