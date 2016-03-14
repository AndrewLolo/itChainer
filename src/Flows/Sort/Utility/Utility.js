export const swap = (array, src, dest) => {
    let buffer = array[src];
    array[src] = array[dest];
    array[dest] = buffer;
};