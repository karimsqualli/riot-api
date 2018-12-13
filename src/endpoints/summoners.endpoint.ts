import axios from 'axios';

export class SummonersEndpoint {


    private baseRequest = axios.create({
        baseURL: 'https://euw1.api.riotgames.com/lol/summoner/v3/summoners/',
        headers: {
            "X-Riot-Token": "RGAPI-5e640cf1-a8b8-43df-b97f-f64b2be67005",
        }
    });

    getByName(name: string): Promise<any> {
        return this.baseRequest.get(`by-name/${name}`)
    }

    getById(id: string): Promise<any> {
        return this.baseRequest.get(`${id}`)
    }

    getByAccount(id: string): Promise<any> {
        return this.baseRequest.get(`by-account/${id}`)
    }
}
