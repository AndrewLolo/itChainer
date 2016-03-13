export default (array, handler) => {
    let resultArray = [];
    if (typeof array != 'object') {
        throw new TypeError('Incorrect input data: not array');
    }
    for (let i = 0; i < array.length; ++i) {
        resultArray.push(handler(array[i], i, array));
    }
    return resultArray;
}