import reduce from './Reduce';

describe('Reduce', () => {
    let Arr;
    const handler = (prV, crV) => {
        return prV + crV;
    };


    beforeEach(() => {
        Arr = [1, 2, 10];
    });

    it('should throw error for incorrect input', () => {
        expect(() => { reduce(2, handler); }).toThrow(new TypeError("Incorrect input data: not array"));
    });

    it('should process array', () => {
        let result = reduce(Arr, handler);
        expect(result).toEqual(13);
    });
});