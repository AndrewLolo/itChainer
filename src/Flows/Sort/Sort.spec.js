import sort from './Sort';
import strategies from './Strategies/Strategies'

describe('Sort', () => {
    let Arr;
    const handler = () => {
        return true;
    };

    beforeEach(() => {
        Arr = [1, 2, 10];
        spyOn(strategies, 'quickSort');
    });

    it('should throw error for incorrect input', () => {
        expect(() => { sort(2, handler); }).toThrow(new TypeError("Incorrect input data: not array"));
    });

    it('should return array', () => {
        let result = sort(Arr, handler);
        expect(result instanceof Array).toBe(true);
    });

    it('should use quicksort as default strategy', () => {
        sort(Arr, handler);
        expect(strategies.quickSort).toHaveBeenCalled();
    });
});