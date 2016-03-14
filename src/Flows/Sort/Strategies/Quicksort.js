import {swap} from '../Utility/Utility'

export let quickSort = (array, handler) => {
    let left = arguments[2] || 0;
    let right = arguments[3] || array.length - 1;

    console.log(array);

    if (!array.length) {
        return array;
    }

    [left, right] = separate(array, handler, left, right);

    if (right > 0) {
        quickSort(array, handler, 0, right);
    }

    if (array.length > left) {
        quickSort(array, handler, left, array.length - left);
    }
};

const separate = (array, handler, left, right) => {
    let baseEl = array[(right + left) >> 1];

    while(array[left] < baseEl) {
        left++;
    }

    while(array[right] > baseEl) {
        right--;
    }

    if (handler(array, left, right)) {
        swap(array, left, right);
    }

    return [left, right];
};