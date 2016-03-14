import {swap} from '../../Utility/Utility'

export let quickSort = (array, handler, left, right) => {
    left = left || 0;
    right = right || (array.length - 1);
    let leftIndex = left;
    let rightIndex = right;
    let baseEl = array[leftIndex + rightIndex >> 1];


    while (leftIndex <= rightIndex) {
        while (handler(array[leftIndex], baseEl) === -1) {
            leftIndex++;
        }
        while (handler(array[rightIndex], baseEl) === 1) {
            rightIndex--;
        }
        if (leftIndex <= rightIndex) {
            swap(array, leftIndex++, rightIndex--);
        }
    }
    ;
    if (left < rightIndex) {
        quickSort(array, handler, left, rightIndex);
    }
    if (leftIndex < right) {
        quickSort(array, handler, leftIndex, right);
    }
};
