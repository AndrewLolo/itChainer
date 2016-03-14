import BaseFlow from '../BaseFlow';

const method = (array, handler) => {
        let resultArray = [];
        if (typeof array != 'object') {
            throw new TypeError('Incorrect input data: not array');
        }
        for (let i = 0; i < array.length; ++i) {
            if (handler(array[i], i, array)) {
                resultArray.push(array[i]);
            }
        }
        return resultArray;
    };

const ctxIndex = 1;

export default new BaseFlow(method, ctxIndex);
