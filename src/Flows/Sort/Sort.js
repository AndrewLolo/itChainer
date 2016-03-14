import {quickSort} from './Strategies/Quicksort'

const strategies = {
    quickSort: quickSort
};

export default (array, handler, strategy = 'quickSort') => {
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }

    if (!strategies.hasOwnProperty(strategy)) {
        strategy = 'quickSort';
    }

    return strategies[strategy](array, handler);
}