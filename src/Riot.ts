import {SummonersEndpoint} from "./endpoints/summoners.endpoint";
import MatchEndpoint from "./endpoints/match.endpoint";
import {Region} from "./enums/region.enum";
import RateLimit from "./RateLimit";
import EndpointsRateLimiteProxy from "./proxies/EndpointsRateProxy";
import RateLimiterQueueProxy from "./proxies/RateLimiterQueueProxy";
import {LeagueEndpoint} from "./endpoints/league.endpoint";


export default class Riot {

    public summoners: SummonersEndpoint;
    public league: LeagueEndpoint;

    public appRates: RateLimit;


    constructor(
        private apiKey: string,
        private region: Region = Region.EUW1) {

        this.appRates = new RateLimit();

        // init endpoints and inject RateLimitingProxy and appRates
        this.summoners = new Proxy(
                new Proxy(new SummonersEndpoint(this.apiKey), EndpointsRateLimiteProxy(this.appRates)),
                new RateLimiterQueueProxy(this.appRates)
            );

        this.league = new Proxy(
            new Proxy(new LeagueEndpoint(this.apiKey), EndpointsRateLimiteProxy(this.appRates)),
            new RateLimiterQueueProxy(this.appRates),
        )
    }
}
