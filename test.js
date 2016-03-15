'use strict';

const _ = require('./index').chain;

let arr = [1 ,7 ,3, 10, 21, 1, 42];

let obj = {
    a: 10,
    b: 'El__MAP: ',
    c: 'El__SORT: ',
    d: 'El__FILTER: ',
    limit: 100
};

let result = _(arr)
    .map(function (el) {
        return this.a * (el + 1);
    }, obj)
    .forEach(function (el, index, array) {
        console.log(array);
    }, obj)
    .map(function (el) {
        return el + 1;
    }, obj)
    .forEach(function (el, index, array) {
        console.log(array);
    }, obj)
    .sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        if (a === b) return 0;
    }, obj)
    .forEach(function (el, index, array) {
        console.log(array);
    }, obj)
    .filter(function (el) {
        return el > this.limit;
    }, obj)
    .forEach(function (el, index, array) {
        console.log(array);
    }, obj)
    .reduce(function (prV, crV) {
        return prV + crV;
    }, 5, obj)
    .run();

console.log(result);