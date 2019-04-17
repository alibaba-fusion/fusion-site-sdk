import assert from "power-assert";
import createInstance from "../../src/lib/http";
import getUrl from "../../src/lib/url";
import {Env} from "../../src/type";

test("create prod axios", function() {
    const instance = createInstance("123");
    assert(instance.defaults.headers["x-auth-token"] === "123");
    assert(instance.defaults.baseURL = getUrl());
});

test("create local axios", function() {
    const instance = createInstance("123", Env.local);
    assert(instance.defaults.baseURL = getUrl(Env.local));
});

test("throw error when token error", async function() {
    const instance = createInstance("");
    try {
        await instance.get("/api/v1/mysites");
        assert(true, "should throw error but not");
    } catch (error) {
        assert(error.name === "UnauthorizeError");
    }
});
