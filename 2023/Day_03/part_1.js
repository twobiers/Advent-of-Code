"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

//
// YOUR CODE HERE
//
const LIMIT_X = INPUT[0].length - 1;
const LIMIT_Y = INPUT.length;
const isMarkerCharacter = (ch) => ch !== '.' && isNaN(Number(ch));

const markerCordinates = INPUT
    .map((line, y) => [...line].map((ch, i) => isMarkerCharacter(ch) ? i : -1).filter(i => i > -1).map(x => [x, y]))
    .flat();

const extractNumberAtCoordinate = (coordinate) => {
    const [x, y] = coordinate;
    const chars = [...INPUT[y]];
    let startBoundary = x;
    let endBoundary = x + 1;
    while (!isNaN(Number(chars[startBoundary - 1]))) {
        startBoundary--;
    }

    while (!isNaN(Number(chars[endBoundary]))) {
        endBoundary++;
    }

    return Number(INPUT[y].substring(startBoundary, endBoundary));
};
const getAdjacentNumberCoordinates = (coordinate) => {
    const [x, y] = coordinate;
    const startX = x > 0 ? x - 1 : x;
    const endX = x < LIMIT_X ? x + 1 : x;
    const startY = y > 0 ? y - 1 : y;
    const endY = y < LIMIT_Y ? y + 1 : y;

    const coordinates = [];

    for (let y1 = startY; y1 <= endY; y1++) {
        const chars = [...INPUT[y1]];
        let foundMatchBefore = false;
        for (let x1 = startX; x1 <= endX; x1++) {
            if (!isNaN(Number(chars[x1]))) {
                if (!foundMatchBefore) {
                    coordinates.push([x1, y1]);
                    foundMatchBefore = true;
                }
            } else {
                foundMatchBefore = false;
            }
        }
    }

    return coordinates;
};

const adjacentNumberCoordinates = markerCordinates.map(getAdjacentNumberCoordinates).flat()
const HIGHLIGHTED = INPUT.map((line, y) => [...line].map((ch, x) => {
    if (markerCordinates.some(([x1, y1]) => y === y1 && x === x1)) return "\x1b[33m" + ch + "\x1b[0m";
    if (adjacentNumberCoordinates.some(([x1, y1]) => y === y1 && x === x1)) return "\x1b[33m" + ch + "\x1b[0m";
    return ch;
}));
console.log(HIGHLIGHTED.map(l => l.join("")).join("\n"));

const result = markerCordinates
    .map(getAdjacentNumberCoordinates)
    .flat()
    .map(extractNumberAtCoordinate)
    .reduce((acc, curr) => acc + curr, 0);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
