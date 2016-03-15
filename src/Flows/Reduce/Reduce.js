import BaseFlow from '../BaseFlow';
import CONST from '../FlowConstants';

const method = (array, handler, initialValue = 0) => {
    const length = array.length;
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }
    if (length === 0) { return null; }
    if (length === 1) { return array[0]; }
    let aggregator = initialValue;
    for (let i = 0; i < array.length; ++i) {
        aggregator = handler(aggregator, array[i], i, array);
    }

    return aggregator;
};

const ctxIndex = CONST.THIRD;
const handlerIndex = CONST.FIRST;

export default new BaseFlow(method, ctxIndex, handlerIndex);