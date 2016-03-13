# itChainer

## Installation
npm i itchainer

## example:
```javascript
'use strict';
const itchainer = require('itChainer').chain;
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
```
