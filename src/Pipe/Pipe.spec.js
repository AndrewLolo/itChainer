import Pipe from './Pipe';
import _map from '../Flows/Map/Map';
import _filter from '../Flows/Filter/Filter';

describe('Pipe', () => {
    let Arr;
    let pipe;

    const method = (handler) => {
        return true;
    };

    const handler = () => {
        return true;
    };

    beforeEach(() => {
        Arr = [1, 2, 10];
        pipe = new Pipe(Arr);
    });

    describe('@initialize', () => {
        it('should wrap array', () => {
            expect(pipe.value).toEqual(Arr);
        });
    });

    describe('@append', () => {
        it('should append queue', () => {
            pipe.append(method, handler);
            let queueElement = {
                method: method,
                handler: handler
            };
            let pipeLastelement = pipe.queue[pipe.queue.length - 1];
            expect(pipeLastelement).toEqual(queueElement);
        });
    });

    describe('@map', () => {
        beforeEach(() => {
            spyOn(pipe, 'append');
        });

        it('should append queue with map method', () => {
            pipe.map(handler);
            expect(pipe.append).toHaveBeenCalledWith(_map, handler);
        });

        it('should return pipe', () => {
            let res = pipe.map(handler);
            expect(res).toBe(pipe);
        });
    });

    describe('@filter', () => {
        beforeEach(() => {
            spyOn(pipe, 'append');
        });

        it('should append queue with filter method', () => {
            pipe.filter(handler);
            expect(pipe.append).toHaveBeenCalledWith(_filter, handler);
        });

        it('should return pipe', () => {
            let res = pipe.filter(handler);
            expect(res).toBe(pipe);
        });
    });

    describe('@process', () => {
        let queueElement;

        beforeEach(() => {
            queueElement = {
                method: method,
                handler: handler
            };
            spyOn(queueElement, 'method');
        });

        it('should process queue element', () => {
            pipe.process(queueElement, Arr);
            expect(queueElement.method).toHaveBeenCalledWith(Arr, queueElement.handler);
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