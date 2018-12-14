import axios, {AxiosInstance} from 'axios';

export class SummonersEndpoint {


    private baseRequest: AxiosInstance;

    constructor(apiKey: string) {

        this.baseRequest = axios.create({
            baseURL: 'https://euw1.api.riotgames.com//lol/league/v3/',
            headers: {
                "X-Riot-Token": apiKey,
            }
        });
    }

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
