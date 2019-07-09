import assert from "power-assert";

import { AxiosInstance } from "axios";
import createInstance from "../../src/lib/http";
import User from "../../src/lib/user";
// tslint:disable-next-line
const tokenjson = require("../token.json");
const token = (tokenjson.token) as string|undefined;
let instance: AxiosInstance;
beforeAll(() => {
    instance = createInstance(token);
});

test("get user sites", async () => {
    const user = new User(instance);
    const res = await user.getSites();
    assert(res.length > 0);
    assert(res[0].id > 0);
});

test.only("check user token", async () => {
    const user = new User(instance);
    const res = await user.checkToken();
    assert(res);
});
