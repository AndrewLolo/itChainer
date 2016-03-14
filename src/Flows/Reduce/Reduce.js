import BaseFlow from '../BaseFlow';

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

const ctxIndex = 2;

export default new BaseFlow(method, ctxIndex);