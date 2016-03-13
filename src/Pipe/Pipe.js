import _map from '../Flows/Map/Map';
import _filter from '../Flows/Filter/Filter';
import _reduce from '../Flows/Reduce/Reduce';
import _forEach from '../Flows/ForEach/ForEach';

export default class {
    constructor(iterable) {
        this.value = iterable;
        this.queue = [];
    }

    map() {
        return this.append(_map, arguments);
    }

    filter() {
        return this.append(_filter, arguments);
    }

    forEach() {
        return this.append(_forEach, arguments);
    }

    reduce() {
        return this.append(_reduce, arguments);
    }

    append(method, params) {
        let queueElement = {
            method: method,
            params: params
        };
        this.queue.push(queueElement);
        return this;
    }

    process(queueElement, value) {
        let method = queueElement.method.bind(this, value);
        let params = queueElement.params;
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