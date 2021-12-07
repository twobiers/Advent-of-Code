"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const [A, B] = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split(require("os").EOL)
    .map(a => a.split(","))
    .map(p => p.map(dir => /(.)(\d+)/g.exec(dir).slice(1, 3)));

const pStart = performance.now();

const dir = [{ U: 0, D: 0, R: +1, L: -1 }, { U: +1, D: -1, R: 0, L: 0 }];

let gP = function(p){
    let pointsMap = {};
    let x = 0;
    let y = 0;
    let len = 0;

    p.forEach(([d0, d1]) => {
        for (let i = 0; i < d1; i++) (len += 1) && (x += dir[0][d0]) && (y += dir[1][d0]) && (pointsMap[`${x},${y}`] = len);
    });
    return pointsMap;
};

let pA = gP(A);
let pB = gP(B);

let RES = Math.min(...Object.keys(pA).filter(k => pB[k]).map(p => pA[p] + pB[p]));

const pEnd = performance.now();

console.log("FEWEST STEPS: " + RES);
console.log(pEnd - pStart);