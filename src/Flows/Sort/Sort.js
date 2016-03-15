import strategies from './Strategies/Strategies'
import BaseFlow from '../BaseFlow';
import CONST from '../FlowConstants';

const method = (array, handler, strategy = 'quickSort') => {
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }

    if (!strategies.hasOwnProperty(strategy)) {
        strategy = 'quickSort';
    }

    strategies[strategy](array, handler);
    return array;
};

const ctxIndex = CONST.SECOND;
const handlerIndex = CONST.FIRST;
const type = CONST.TERMINATOR;

export default new BaseFlow(method, ctxIndex, handlerIndex, type);