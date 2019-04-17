import { from } from "_rxjs@6.4.0@rxjs";
import assert from "power-assert";
import * as axios from "../src/lib/http";
import getUrl from "../src/lib/url";
import {Env} from "../src/type";

// tslint:disable-next-line
const tokenjson = require("./token.json");
const token = (tokenjson.token) as string|undefined;

test("get token", function() {
    assert(token);
});

test("create prod axios", function() {
    axios.createInstance(token);
    const instance = axios.default();
    assert(instance.defaults.headers["x-auth-token"] === token);
    assert(instance.defaults.baseURL = getUrl());
});

test("create local axios", function() {
    axios.createInstance(token, Env.local);
    const instance = axios.default();
    assert(instance.defaults.baseURL = getUrl(Env.local));
});

test("throw error when token error", async function() {
    axios.createInstance("");
    const instance = axios.default();
    try {
        await instance.get("/api/v1/mysites");
        assert(true, "should throw error but not");
    } catch (error) {
        assert(error.name === "UnauthorizeError");
    }
});
