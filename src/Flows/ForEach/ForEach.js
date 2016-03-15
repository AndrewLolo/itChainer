import BaseFlow from '../BaseFlow';
import CONST from '../FlowConstants';

const method = (array, handler, iterationIndex) => {
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }

    handler(array[iterationIndex], iterationIndex, array);
};

const ctxIndex = CONST.SECOND;
const handlerIndex = CONST.FIRST;
const type = CONST.STAGED;

export default new BaseFlow(method, ctxIndex, handlerIndex, type);