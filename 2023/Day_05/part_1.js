"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

//
// YOUR CODE HERE
//
const buildConverter = (/** @type number[][] */ numbers) => {
    return (x) => {
        const n = numbers.find(n => x >= n[1] && x < n[1] + n[2]);
        if (n === undefined) return x;

        return n[0] + (x - n[1]);
    }
}
const seeds = INPUT[0].split(":")[1].trim().split(" ").map(Number);
const maps = INPUT.slice(2).join("\n").split(/\n{2,}/g).map(n => n.split(/\n{1,}/g).map(t => t.trim()));
const converters = maps.map((curr) => {
    const name = curr[0].split(" ")[0];
    const source = name.split("-to-")[0];
    const target = name.split("-to-")[1];

    const numbers = curr.slice(1).map(n => n.split(" ").map(Number));
    const converter = buildConverter(numbers);

    return {
        source, target, converter
    }
});

const locations = seeds.map(s => {
    let c = s;
    for (const o of converters) {
        c = o.converter(c);
    }
    return c;
});


const result = Math.min(...locations);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
