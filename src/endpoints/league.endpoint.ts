import axios from 'axios';

export class LeagueEndpoint {


    private baseRequest = axios.create({
        baseURL: 'https://euw1.api.riotgames.com//lol/league/v3/',
        headers: {
            "X-Riot-Token": "RGAPI-9928c6e8-2154-460c-9101-bd0430309ade",
        }
    });

    getBySummonerId(id: string): Promise<any> {
        return this.baseRequest.get(`positions/by-summoner/${id}/`)
    }

}
