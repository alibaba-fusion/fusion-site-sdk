import axios, { AxiosInstance } from "axios";
import Debug from "debug";
const debug = Debug("fusion-sdk:http");
import { Env } from "../type";
import {UnauthorizeError} from "./error";
import getUrl from "./url";

let instance: AxiosInstance = axios.create();

export function createInstance(token: string, env?: Env) {
    const baseURL = getUrl(env);
    instance = axios.create({
        baseURL,
        headers: { "x-auth-token": token, "content-type": "application/json" },
    });
    instance.interceptors.request.use(function(config) {
        // Do something before request is sent
        if (typeof config.data === "object") {
            config.data = JSON.stringify(config.data);
        }
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function(response) {
        // Do something with response data
        return response;
    }, function(error) {
        // Do something with response error
        const res = error.response;
        if (res.status === 401 || res.status === 403 ) {
            const err = new UnauthorizeError();
            err.response = res;
            return Promise.reject(new UnauthorizeError());
        }
        return Promise.reject(error);
    });
}

export default function getAxios() {
    return instance;
}
