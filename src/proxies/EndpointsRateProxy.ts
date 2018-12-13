import RateLimit, {RateLimitHeaderName} from "../RateLimit";


// this proxy is used for setting current rates limit (global and per mothod basis)

export default function (appRates: RateLimit) {

    return {
        get(obj: any, prop: string) {

            if (obj[prop] && typeof obj[prop] == 'function') {

                let fn = obj[prop];
                let fnName = fn.name;
                let ratesPropName = `_methodRates__${fnName}`;

                if (!obj[ratesPropName]) {
                    obj[ratesPropName] = new RateLimit();
                }

                return (...args: Array<any>) => {

                    return (obj[prop](...args) as Promise<any>).then(res => {

                        (obj[ratesPropName] as RateLimit).setRates(res.headers[RateLimitHeaderName.METHOD_LIMIT],
                            res.headers[RateLimitHeaderName.METHOD_CURRENT]);

                        appRates.setRates(res.headers[RateLimitHeaderName.APP_LIMIT],
                            res.headers[RateLimitHeaderName.APP_CURRENT]);

                        return res;
                    })
                }
            }

            return obj[prop];
        }
    }

}
