import strategies from './Strategies/Strategies'

export default (array, handler, strategy = 'quickSort') => {
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }

    if (!strategies.hasOwnProperty(strategy)) {
        strategy = 'quickSort';
    }

    strategies[strategy](array, handler);
    return array;
}