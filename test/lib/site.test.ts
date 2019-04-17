import assert from "power-assert";

import { AxiosInstance } from "axios";
import createInstance from "../../src/lib/http";
import Site from "../../src/lib/site";
// tslint:disable-next-line
const tokenjson = require("../token.json");
const token = (tokenjson.token) as string|undefined;
let instance: AxiosInstance;
const siteId = 16;
beforeAll(() => {
    instance = createInstance(token);
});

test("token exits", () => {
    assert(token);
});

test("add block", async () => {
    const site = new Site(instance);
    const res = await site.addBlocks(siteId, ["@icedesign/user-landing-block@2.0.0"]);
    assert(res.success);
});

test("add bizcomp", async () => {
    const site = new Site(instance);
    const res = await site.addComponents(siteId, ["@icedesign/styled-menu@1.0.0"]);
    assert(res.success);
});

test("add scaffold", async () => {
    const site = new Site(instance);
    const res = await site.addScaffolds(siteId, ["@icedesign/order-management-scaffold@2.0.5"]);
    assert(res.success);
});

test("throw error when exceed limit", async () => {
    const mcs = {
        blocks: [],
        components: [],
        scaffolds: [],
    };

    for (let index = 0; index < 11; index++) {
        mcs.scaffolds.push("@icedesign/order-management-scaffold@2.0.5");
        mcs.blocks.push("@icedesign/user-landing-block@2.0.0");
        mcs.components.push("@icedesign/styled-menu@1.0.0");
    }

    const site = new Site(instance);
    try {
        await site.addMaterials(siteId, mcs);
        assert(false, "should throw error but not");
    } catch (error) {
        assert(/Sync\smaterials\snumber\sshould\sno\smore\sthan/.test(error.message));
    }
});

test("throw error when add materials to unauthor site", async () => {
    const site = new Site(instance);
    const siteId2 = 18; // 这里需要些一个 自己没权限的siteId
    try {
        await site.addScaffolds(siteId2, ["@icedesign/order-management-scaffold@2.0.5"]);
        assert(false, "should throw error but not");
    } catch (error) {
        assert(error.name === "UnauthorizeError");
    }
});
