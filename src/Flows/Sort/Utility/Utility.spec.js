import * as util from './Utility';

describe('Utility', () => {
    let Arr;

    beforeEach(() => {
        Arr = [1, 2, 10];
    });

    describe('Swap', () => {
        it('should swap array elements', () => {
            util.swap(Arr, 0, 2);
            expect(Arr).toEqual([10, 2, 1]);
        });
    });
});