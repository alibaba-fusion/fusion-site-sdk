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
        const err = new ResponseFailError();
        err.response = response;

        if (response.status !== 200) {
            // 非200 报错
            return Promise.reject(err);
        } else if (response.request.method !== "HEAD" && !response.data.success) {
            // 非HEAD方法 但是返回体里面没有内容 报错
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
