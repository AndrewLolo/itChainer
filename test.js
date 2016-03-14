'use strict';

const _ = require('./index').chain;

let arr = [1 ,7 ,3, 10, 21, 1, 42];

let obj = {
    a: 100,
    b: 'El__MAP: ',
    c: 'El__SORT: ',
    d: 'El__FILTER: ',
};

let result = _(arr)
    .map(function (el) {
        return this.a * (el + 1);
    }, obj)
    .forEach(function (el) {
        console.log(this.b + el);
    }, obj)
    .sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        if (a === b) return 0;
    }, obj)
    .forEach(function (el) {
        console.log(this.c + el);
    }, obj)
    .filter(function (el) {
        return el > (10 * this.a);
    }, obj)
    .forEach(function (el) {
        console.log(this.d + el);
    }, obj)
    .reduce(function (prV, crV) {
        console.log(obj);
        return prV + crV;
    }, null, obj)
    .run();

console.log(result);