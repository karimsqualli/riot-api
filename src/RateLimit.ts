

export enum RateLimitHeaderName {
    APP_LIMIT = 'x-app-rate-limit',
    APP_CURRENT = 'x-app-rate-limit-count',
    METHOD_LIMIT = 'x-method-rate-limit',
    METHOD_CURRENT = 'x-method-rate-limit-count'
}


export interface IRateLimitDetail {
    limit: number;
    time: number;
    current: number;
}

export default class RateLimit {

    private _rates: Array<IRateLimitDetail> = [];
    private _retryAfter: number;


    get retryAfter() {
        return this._retryAfter;
    }

    set retryAfter(val: number) {
        this._retryAfter = val;
        setTimeout(() => this.retryAfter = -1, val);
    }

    setRates(rateLimits: string, currentRates: string) {
        let rateLimitsArr = rateLimits.split(",")

        rateLimitsArr.forEach((rate, idx) => {

            let value = rate.split(":")

            // @ts-ignore
            this._rates[idx] = {
                limit: value[0],
                time:  value[1],
            }
        })

        rateLimitsArr = currentRates.split(",");
        rateLimitsArr.forEach((rate, idx) => {

            let value = rate.split(":")

            // @ts-ignore
            this._rates[idx] = {
                ...this._rates[idx],
                current: value[0],
                time:  value[1],
            }
        })
    }

    canExecute() {

        let canExecute = true;

        if(this.retryAfter > 0) {
            return false;
        }

        return canExecute;
    }
}
