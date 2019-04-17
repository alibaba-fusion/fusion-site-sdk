import assert from "power-assert";
import FusionClient from "../src/index";
import { Env } from "../src/type";

// tslint:disable-next-line
const tokenjson = require("./token.json");
const token = (tokenjson.token) as string|undefined;
const temptoken = "1234";

test("support init", () => {
    const client = new FusionClient({
        token: temptoken,
    });
    assert(client.getToken() === temptoken);
    assert(client.env === "prod");
});

test("support init other env", () => {
    const client = new FusionClient({
        env: "pre" as Env,
        token: temptoken,
    });
    assert(client.getToken() === temptoken);
    assert(client.env === "pre");
});

test("support change token", () => {
    const client = new FusionClient(temptoken);
    client.setToken(token);
    assert(client.getToken() === token);
    assert(client.env === "prod");
});

test("support get sites", async () => {
    const client = new FusionClient(token);
    const sites = await client.user.getSites();
    assert(Array.isArray(sites));
});

test("support add material", async () => {
    const client = new FusionClient(token);
    const siteId = 16;
    const result = await client.site.addMaterials(siteId, {
        blocks: [],
        components: ["@icedesign/styled-menu@1.0.0"],
        scaffolds: [],
    });
    assert(result.success, result.message);
});
