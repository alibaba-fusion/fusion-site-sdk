import assert from "power-assert";
import Base from "../../src/lib/base";
import createInstance from "../../src/lib/http";
import getUrl from "../../src/lib/url";
import {Env} from "../../src/type";

test("support init client", function() {
    const instance = createInstance("123");
    const base = new Base(instance);
    assert(base.client.defaults.headers["x-auth-token"] === "123");
    assert(base.client.defaults.baseURL = getUrl());
});

test("support change client", function() {
    const instance = createInstance("123");
    const base = new Base(instance);

    const instance2 = createInstance("444", Env.aliprod);
    base.setClient(instance2);
    assert(base.client.defaults.headers["x-auth-token"] === "444");
    assert(base.client.defaults.baseURL = getUrl(Env.aliprod));
});
