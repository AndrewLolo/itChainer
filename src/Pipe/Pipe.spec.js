import Pipe from './Pipe';
import _map from '../Flows/Map/Map';
import _filter from '../Flows/Filter/Filter';
import _reduce from '../Flows/Reduce/Reduce';
import _forEach from '../Flows/ForEach/ForEach';
import _sort from '../Flows/Sort/Sort';

describe('Pipe', () => {
    let Arr;
    let pipe;
    let params;

    const method = (handler) => {
        return true;
    };

    const handler = () => {
        return true;
    };

    beforeEach(() => {
        Arr = [1, 2, 10];
        params = [
            Arr,
            handler
        ];

        pipe = new Pipe(Arr);
    });

    describe('@initialize', () => {
        it('should wrap array', () => {
            expect(pipe.value).toEqual(Arr);
        });
    });

    describe('@append', () => {
        it('should append queue', () => {
            pipe.append(method, params);
            let queueElement = {
                method: method,
                params: params
            };
            let pipeLastelement = pipe.queue[pipe.queue.length - 1];
            expect(pipeLastelement).toEqual(queueElement);
        });
    });

    describe('@map', () => {
        beforeEach(() => {
            spyOn(pipe, 'append').and.returnValue(pipe);
        });

        it('should append queue with map method', () => {
            pipe.map();
            expect(pipe.append).toHaveBeenCalledWith(_map, jasmine.anything());
        });

        it('should return pipe', () => {
            let res = pipe.map();
            expect(res).toBe(pipe);
        });
    });

    describe('@filter', () => {
        beforeEach(() => {
            spyOn(pipe, 'append').and.returnValue(pipe);
        });

        it('should append queue with filter method', () => {
            pipe.filter();
            expect(pipe.append).toHaveBeenCalledWith(_filter, jasmine.anything());
        });

        it('should return pipe', () => {
            let res = pipe.filter();
            expect(res).toBe(pipe);
        });
    });

    describe('@reduce', () => {
        beforeEach(() => {
            spyOn(pipe, 'append').and.returnValue(pipe);
        });

        it('should append queue with filter method', () => {
            pipe.reduce();
            expect(pipe.append).toHaveBeenCalledWith(_reduce, jasmine.anything());
        });

        it('should return pipe', () => {
            let res = pipe.reduce();
            expect(res).toBe(pipe);
        });
    });

    describe('@forEach', () => {
        beforeEach(() => {
            spyOn(pipe, 'append').and.returnValue(pipe);
        });

        it('should append queue with filter method', () => {
            pipe.forEach();
            expect(pipe.append).toHaveBeenCalledWith(_forEach, jasmine.anything());
        });

        it('should return pipe', () => {
            let res = pipe.forEach();
            expect(res).toBe(pipe);
        });
    });

    describe('@sort', () => {
        beforeEach(() => {
            spyOn(pipe, 'append').and.returnValue(pipe);
        });

        it('should append queue with filter method', () => {
            pipe.sort();
            expect(pipe.append).toHaveBeenCalledWith(_sort, jasmine.anything());
        });

        it('should return pipe', () => {
            let res = pipe.forEach();
            expect(res).toBe(pipe);
        });
    });

    describe('@process', () => {
        let queueElement;
        let bindedMethod;

        beforeEach(() => {
            queueElement = {
                method: method,
                params: params
            };
            bindedMethod = () => {};

            spyOn(queueElement.method, 'bind').and.returnValue(bindedMethod);
            spyOn(bindedMethod, 'apply');
            pipe.process(queueElement, Arr);
        });

        it('should bind pipe value into method', () => {
            expect(queueElement.method.bind).toHaveBeenCalledWith(pipe, pipe.value);
        });

        it('should process pipe value with binded method', () => {
            expect(bindedMethod.apply).toHaveBeenCalledWith(null, params);
        });
    });

    describe('@run', () => {
        beforeEach(() => {
            spyOn(pipe, 'process');
            pipe.map(handler);
        });

        it('should process array', () => {
            pipe.run();
            expect(pipe.process).toHaveBeenCalledTimes(pipe.queue.length);
        });

        it('should return processed array', () => {
            expect(pipe.run()).toBe(pipe.value);
        });
    });

});