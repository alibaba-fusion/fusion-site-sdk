import assert from "power-assert";

import {createInstance} from "../src/lib/http";
import user from "../src/lib/user";
// tslint:disable-next-line
const tokenjson = require("./token.json");
const token = (tokenjson.token) as string|undefined;

beforeAll(() => {
    createInstance(token);
});

test("get user sites", async () => {
    const res = await user.getSites();
    assert(res.length > 0);
    assert(res[0].id > 0);
});
