import map from './Map';

describe('Map', () => {
    let Arr;
    const handler = (el) => {
        return el * 5;
    };


    beforeEach(() => {
        Arr = [1, 2, 10];
    });

    it('should process array', () => {
        let result = map(Arr, handler);
        expect(result).toEqual([5, 10, 50]);
    });

    it('array length should not be changed', () => {
        let result = map(Arr, handler);
        expect(result.length).toEqual(Arr.length);
    });
});