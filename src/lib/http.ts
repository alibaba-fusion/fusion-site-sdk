import axios from "axios";
import Debug from "debug";
const debug = Debug("fusion-sdk:http");
import { Env } from "../type";
import {ResponseFailError, UnauthorizeError} from "./error";
import getUrl from "./url";

export default function createInstance(token: string, env?: Env) {
    const baseURL = getUrl(env);
    const instance = axios.create({
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
    instance.interceptors.response.use(function(response) {
        if (response.status === 200 && !response.data.success) {
            debug("%o", response);
            const err = new ResponseFailError();
            err.response = response;
            return Promise.reject(err);
        }
        return response;
    }, function(error) {
        debug("%o", error);
        const res = error.response;
        if (res.status === 401 || res.status === 403 ) {
            const err = new UnauthorizeError();
            err.response = res;
            return Promise.reject(err);
        }
        return Promise.reject(error);
    });
    return instance;
}
