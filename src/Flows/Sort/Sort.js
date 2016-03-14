import strategies from './Strategies/Strategies'
import BaseFlow from '../BaseFlow';

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

const ctxIndex = 1;

export default new BaseFlow(method, ctxIndex);