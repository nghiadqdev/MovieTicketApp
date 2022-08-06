import { HttpClient, IRequestOptions } from "~/@helpers/network/HttpClient";
import { IObjectPromise } from "~/@helpers/utils";
import { NavigationProp } from "@react-navigation/native";
import { NavService } from "../navigation/nav.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configEnv } from "~/@config";



// const timeout = 10000;
class BasicApiService {
    private httpClient: HttpClient
    private navigation: NavService | NavigationProp<any>
    constructor(config: {
        baseurl: string, options: IRequestOptions, interceptors?: IObjectPromise
    }) {
        this.httpClient = new HttpClient(config)
    }

    setNavigation(navigation: NavService | NavigationProp<any>) {
        this.navigation = navigation
    }

    async get<T = any>(endpoint: string, params: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.get(endpoint, params);
            const jsonData = await res.json();
            if (!jsonData) {
                throw "DATA IS NOT JSON TYPE"
            }
            return jsonData;
        } catch (error) {
            throw error;
        }
    }
    async post<T = any>(endpoint: string, body: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.post(endpoint, body);
            const jsonData = await res.json();
            if (!jsonData) {
                throw "DATA IS NOT JSON TYPE"
            }

            return jsonData;
        } catch (error) {
            console.log('-------------------');
            console.log(error);
            console.log('-------------------');
            throw error;
        }
    }

}
const { host, hostAuth, apikey } = configEnv();
export default new BasicApiService({
    baseurl: host,
    options: {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            apikey: apikey
        }
    },
    interceptors: {
        Authorization: AsyncStorage.getItem("Authorization")
    }
});