import RateLimit from "../RateLimit";
import AsyncQueue from "../AsyncQueue";


// this proxy is used for adding request to queue to respect rates limit


export default class RateLimiterQueueProxy {


    private queue: AsyncQueue = new AsyncQueue();
    private obj: any;
    private appRates: RateLimit;

    constructor(appRates: RateLimit) {
        this.appRates = appRates;

        setInterval(this.resolveNext.bind(this), 20);
    }

    get(obj: any, prop: string, receiver: any) {

        if (obj[prop] && typeof obj[prop] == 'function') {

            this.obj = obj;

            let fn = obj[prop];
            let fnName = fn.name;
            let ratesPropName = `_methodRates__${fnName}`;


            // @ts-ignore
            return (...args) => {
                return this.queue.add(obj, obj[prop], args);
            }
        }

        return obj[prop];
    }

    resolveNext() {

        if (this.appRates.canExecute() &&
            !this.queue.isRunning()) {
            let queueList = this.queue.getQueueList();

            for (let task of queueList) {

                let rates = task.obj[`_methodRates__${task.fn.name}`];

                if (rates == undefined ||
                    (rates as RateLimit).canExecute()) {

                    try {
                        this.queue.resolveNext();
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    }
}

