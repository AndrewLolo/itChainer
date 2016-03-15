import _map from '../Flows/Map/Map';
import _filter from '../Flows/Filter/Filter';
import _reduce from '../Flows/Reduce/Reduce';
import _forEach from '../Flows/ForEach/ForEach';
import _sort from '../Flows/Sort/Sort';
import CONST from '../Flows/FlowConstants';

const flows = {
    map: _map,
    filter: _filter,
    reduce: _reduce,
    forEach: _forEach,
    sort: _sort
};

const flowKeys = Object.keys(flows);

export default class {
    constructor(iterable) {
        this.value = iterable;
        this.queue = [];
        this.createFlowMethods(flowKeys);
    }

    createFlowMethods(flowKeys) {
        for (let i = 0; i < flowKeys.length; ++i) {
            const flow = flowKeys[i];

            if (flows[flow].type === CONST.STAGED) {
                this[flow] = function () {
                    return this.appendStaged(flows[flow], arguments);
                }
            }
            else if (flows[flow].type === CONST.TERMINATOR) {
                this[flow] = function () {
                    return this.appendTerminator(flows[flow], arguments);
                }
            }
        }
    }

    appendStaged(flow, params) {
        let ctx = params[flow.ctxIndex];
        let handler = params[flow.handlerIndex].bind(ctx);
        let method = flow.method.bind(ctx, this.value, handler);

        params = _filter.method(params, (el, index) => {
            return index > flow.handlerIndex && index !== flow.ctxIndex;
        });
        params.length++;

        let queueElement = {
            method: method,
            handler: handler,
            params: params
        };

        this.queue.push(queueElement);
        return this;
    }

    appendTerminator(flow, params) {
        let ctx = params[flow.ctxIndex];
        let handler = params[flow.handlerIndex].bind(ctx);
        let method = flow.method.bind(ctx, this.value, handler);

        params = _filter.method(params, (el, index) => {
            return index > flow.handlerIndex && index !== flow.ctxIndex;
        });

        let queueElement = {
            method: method,
            handler: handler,
            params: params
        };

        this.queue.push(queueElement);
        this.value = this.processQueueIteration();
        return this;
    }

    process(queueElement, iterationIndex) {
        let params = queueElement.params;
        params[params.length - 1] = iterationIndex;
        return queueElement.method.apply(null, params);
    }

    processQueueIteration() {
        console.log('Process Iteration');
        let terminator = this.queue[this.queue.length - 1];
        for (let valueIndex = 0; valueIndex < this.value.length; ++valueIndex) {
            for (let queueIndex = 0; queueIndex < this.queue.length - 1; ++queueIndex) {
                this.process(this.queue[queueIndex], valueIndex);
            }
        }

        this.queue = [];
        return terminator.method.apply(null, terminator.params);
    }

    run() {
        return this.queue.length ? this.processQueueIteration() : this.value;
    }

};