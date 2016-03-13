export default (array, handler) => {
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }
    for (let i = 0; i < array.length; ++i) {
        handler(array[i], i, array);
    }
    return array;
}