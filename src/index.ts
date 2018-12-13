import Riot from "./Riot";
import {RateLimitHeaderName} from "./RateLimit";
import {SummonersEndpoint} from "./endpoints/summoners.endpoint";

let riot = new Riot();


// let summoner = new SummonersEndpoint()
// summoner.getByName("rogorde").then(res => {
//     console.log(res.data)
// })


for(let i = 0; i < 120; ++i) {
    riot.summoners.getByName('Rogorde').then((data) => {
        console.log(i)
        console.log(riot)
        console.log(data.data)
    }).catch(err => {
        console.log(err.err)
    })

}


