import BaseFlow from '../BaseFlow';
import CONST from '../FlowConstants';

const method = (array, handler) => {
    let resultArray = [];
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }
    for (let i = 0; i < array.length; ++i) {
        resultArray.push(handler(array[i], i, array));
    }
    return resultArray;
};

const ctxIndex = CONST.SECOND;
const handlerIndex = CONST.FIRST;

export default new BaseFlow(method, ctxIndex, handlerIndex);