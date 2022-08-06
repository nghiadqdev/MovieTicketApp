import { HttpClient, IRequestOptions } from "~/@helpers/network/HttpClient";
import { IObjectPromise } from "~/@helpers/utils";
import { NavigationProp } from "@react-navigation/native";
import navService, { NavService } from "../navigation/nav.service";
import { AxiosHttpClient, IAxiosRequestOptions } from "~/@helpers/network/AxiosHttpClient";
import { configEnv } from "~/@config";
import { KeyHeader } from "~/common/constants/KeyHeader";
import AsyncStorage from '@react-native-async-storage/async-storage';



// const timeout = 10000;
class ApiService {
    private httpClient: AxiosHttpClient

    constructor(config: {
        baseurl: string, options: IAxiosRequestOptions, interceptors?: IObjectPromise
    }) {
        this.httpClient = new AxiosHttpClient(config);
    }
    async get<T = any>(endpoint: string, params: any = {}, body: any = {}): Promise<T> {
        try {
            // console.log('---------PARAMS GET----------');
            // console.log(JSON.stringify(body));
            // console.log('---------PARAMS GET----------');
            const res = await this.httpClient.get<T>(endpoint, params, body);
            // console.log('---------DATA GET----------');
            // console.log(res.data);
            // console.log('---------DATA GET----------');

            return res.data
        } catch (error) {
            throw error;
        }
    }
    async post<T = any>(endpoint: string, body: any = {}): Promise<T> {
        try {
            // console.log('---------PARAMS POST----------');
            // console.log(JSON.stringify(body));
            // console.log('---------PARAMS POST----------');
            const res = await this.httpClient.post<T>(endpoint, body);
            // console.log('---------DATA POST----------');
            // console.log(res.data);
            // console.log('---------DATA POST----------');
            return res.data;
        } catch (error) {
            throw error;
        }
    }

}

const { host, hostAuth, apikey } = configEnv();

export const apiService = new ApiService({
    baseurl: host,
    options: {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    },
    interceptors: {
        Authorization: () => AsyncStorage.getItem(KeyHeader.token)
    }
});

export const apiServiceImg = new ApiService({
    baseurl: host,
    options: {
        timeout: 30000,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
});

export const authApiService = new ApiService({
    baseurl: hostAuth,
    options: {
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    },
    interceptors: {
        Authorization: () => AsyncStorage.getItem(KeyHeader.token)
    }
});