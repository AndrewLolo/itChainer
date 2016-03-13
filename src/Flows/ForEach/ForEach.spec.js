import forEach from './ForEach';

describe('ForEach', () => {
    let Arr;
    const handler = (el) => {
        return el * 5;
    };


    beforeEach(() => {
        Arr = [1, 2, 10];
    });

    it('should throw error for incorrect input', () => {
        expect(() => { forEach(2, handler); }).toThrow(new TypeError("Incorrect input data: not array"));
    });

    it('should return same array', () => {
        let result = forEach(Arr, handler);
        expect(result).toBe(Arr);
    });

    it('array length should not be changed', () => {
        let result = forEach(Arr, handler);
        expect(result.length).toEqual(Arr.length);
    });
});