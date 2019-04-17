import { from } from "_rxjs@6.4.0@rxjs";
import assert from "power-assert";
import * as axios from "../src/lib/http";
import getUrl from "../src/lib/url";
import {Env} from "../src/type";

test("create prod axios", function() {
    axios.createInstance("123");
    const instance = axios.default();
    assert(instance.defaults.headers["x-auth-token"] === "123");
    assert(instance.defaults.baseURL = getUrl());
});

test("create local axios", function() {
    axios.createInstance("123", Env.local);
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
