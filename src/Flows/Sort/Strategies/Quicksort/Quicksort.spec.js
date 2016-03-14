import {quickSort} from './Quicksort';

describe('Quicksort', () => {
    let Arr;
    const handler = (a, b) => {
        if (a > b) {
            return 1;
        }

        if (a < b) {
            return -1;
        }

        if (a === b) {
            return 0;
        }
    };

    beforeEach(() => {
        Arr = [1, 2, 10, 3, 7, 4];
    });

    it('should sort input array', () => {
        quickSort(Arr, handler);
        expect(Arr).toEqual([1, 2, 3, 4, 7, 10]);
    });

});