import _map from '../Flows/Map/Map';
import _filter from '../Flows/Filter/Filter';
import _reduce from '../Flows/Reduce/Reduce';
import _forEach from '../Flows/ForEach/ForEach';
import _sort from '../Flows/Sort/Sort';

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
            this[flow] = function() {
                return this.append(flows[flow], arguments);
            }
        }
    }

    append(flow, params) {
        let queueElement = {
            method: flow.method,
            ctxIndex: flow.ctxIndex,
            handlerIndex: flow.handlerIndex,
            params: params
        };
        this.queue.push(queueElement);
        return this;
    }

    process(queueElement, value) {
        let params = queueElement.params;
        let ctx = params[queueElement.ctxIndex];
        let handler = params[queueElement.handlerIndex].bind(ctx);
        let method = queueElement.method.bind(ctx, value, handler);

        params = _filter.method(params, (el, index) => {
           return index > queueElement.handlerIndex;
        });
        return method.apply(null, params);
    }

    run() {
        for (let i = 0; i < this.queue.length; i++) {
            if (!this.value) { return null; }
            this.value = this.process(this.queue[i], this.value);
        }
        return this.value;
    }

};