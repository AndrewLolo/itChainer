export default (array, handler) => {
    let resultArray = [];
    for (let i = 0; i < array.length; ++i) {
        if (handler(array[i], i, array)) {
            resultArray.push(array[i]);
        }
    }
    return resultArray;
}