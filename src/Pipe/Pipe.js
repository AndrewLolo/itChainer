import _map from '../Flows/Map/Map';
import _filter from '../Flows/Filter/Filter';

export default class {
    constructor(iterable) {
        this.value = iterable;
        this.queue = [];
    }

    map(handler) {
        this.append(_map, handler);
        return this;
    }

    filter(handler) {
        this.append(_filter, handler);
        return this;
    }

    append(method, handler) {
        let queueElement = {
            method: method,
            handler: handler
        };
        this.queue.push(queueElement);
    }

    process(queueElement, value) {
        let method = queueElement.method;
        let handler = queueElement.handler;
        return method(value, handler);
    }

    run() {
        for (let i = 0; i < this.queue.length; i++) {
            this.value = this.process(this.queue[i], this.value);
        }
        return this.value;
    }

};