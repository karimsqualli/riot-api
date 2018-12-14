import axios, {AxiosInstance} from 'axios';

export class LeagueEndpoint {

    private baseRequest: AxiosInstance;

    constructor(apiKey: string) {

        this.baseRequest = axios.create({
            baseURL: 'https://euw1.api.riotgames.com//lol/league/v3/',
            headers: {
                "X-Riot-Token": apiKey,
            }
        });
    }



    getBySummonerId(id: string): Promise<any> {
        return this.baseRequest.get(`positions/by-summoner/${id}/`)
    }

}
