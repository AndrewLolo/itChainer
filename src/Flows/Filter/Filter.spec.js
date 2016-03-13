import filter from './Filter';

describe('Filter', () => {
    let Arr;

    const handler = (el) => {
        return el > 5;
    };

    beforeEach(() => {
        Arr = [1, 2, 10];
    });

    it('should filter array', () => {
        let result = filter(Arr, handler);
        expect(result).toEqual([10]);
    });
});