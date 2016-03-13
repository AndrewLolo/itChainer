import filter from './Filter';

describe('Filter', () => {
    let Arr;

    const handler = (el) => {
        return el > 5;
    };

    beforeEach(() => {
        Arr = [1, 2, 10];
    });

    it('should throw error for incorrect input', () => {
        expect(() => { filter(2, handler); }).toThrow(new TypeError("Incorrect input data: not array"));
    });


    it('should filter array', () => {
        let result = filter(Arr, handler);
        expect(result).toEqual([10]);
    });
});