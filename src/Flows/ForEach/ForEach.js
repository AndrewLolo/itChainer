import BaseFlow from '../BaseFlow';
import CONST from '../FlowConstants';

const method = (array, handler) => {
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }
    for (let i = 0; i < array.length; ++i) {
        handler(array[i], i, array);
    }
    return array;
};

const ctxIndex = CONST.SECOND;
const handlerIndex = CONST.FIRST;

export default new BaseFlow(method, ctxIndex, handlerIndex);