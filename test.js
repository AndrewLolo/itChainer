/**
 * Created by я on 13.03.2016.
 */
'use strict';
const itchainer = require('./index').chain;

console.log(itchainer);
let Arr = [1, 2, 3];

let result = itchainer(Arr)
    .map((el) => {
        return el *2;
    })
    .map((el) => {
        return el + 1;
    })
    .run();


console.log(result);