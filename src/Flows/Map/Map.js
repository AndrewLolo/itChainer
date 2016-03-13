export default (array, handler) => {
    let resultArray = [];
    for (let i = 0; i < array.length; ++i) {
        resultArray.push(handler(array[i], i, array));
    }
    return resultArray;
}