export default class AsyncQueue {

    private priorityQueue: Array<{
        obj: any,
        fn: Function,
        param: Array<any>,
        resolve: Function,
    }> = [];

    private queue: Array<{
        obj: any,
        fn: Function,
        param: Array<any>,
        resolve: Function,
    }> = [];

    private running: boolean = false;

    constructor() {
    }

    add(obj: any, fn: Function, param: any, priority = 0) {
        return new Promise(resolve => {

            if (priority == 0)
                this.queue.push({obj, fn, param, resolve});
            else
                this.priorityQueue.push({obj, fn, param, resolve})
        });
    }

    resolveNext() {

        if(!this.running) {
            // check that retry after is available

            if (!this.priorityQueue.length && !this.queue.length) return;

            const {fn, param, resolve} = this.priorityQueue.length ? this.priorityQueue.shift() : this.queue.shift();
            this.running = true;


            // this can return 423 error ( limit app rates, this will be handled by RateLimiterQueueProxy )
            (fn(...param) as Promise<any>).then(res => {
                this.running = false;
                resolve(res);
            });
        }
    }

    isRunning() {
        return this.running;
    }

    getQueueList() {
        return [
            ...this.priorityQueue,
            ...this.queue,
        ]
    }
}
