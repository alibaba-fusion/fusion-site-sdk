
import Debug from "debug";
const debug = Debug("fusion-sdk:site");
import {IFusionHttpResponse, ISiteMaterialsPatch} from "../type";
import BaseHttpClient from "./base";

class Site extends BaseHttpClient {
    public static MAX_COUNT = 20;
    public async addMaterials(siteId: number , materials: ISiteMaterialsPatch) {
        const total = materials.blocks.length + materials.scaffolds.length + materials.components.length;
        if (total > Site.MAX_COUNT) {
            throw new Error(`Sync materials number should no more than ${Site.MAX_COUNT}`);
        }

        const url = `/api/v1/sites/${siteId}/materials`;
        const res = await this.client.patch(url, materials);
        debug("%o", res);
        const data = res.data as IFusionHttpResponse;
        return data;
    }

    public async addBlocks(siteId: number , blocks: string[]) {
        const mcs: ISiteMaterialsPatch = {
            blocks,
            components: [],
            scaffolds: [],
        };
        return this.addMaterials(siteId, mcs);
    }

    public async addComponents(siteId: number , comps: string[]) {
        const mcs: ISiteMaterialsPatch = {
            blocks: [],
            components: comps,
            scaffolds: [],
        };
        return this.addMaterials(siteId, mcs);
    }

    public async addScaffolds(siteId: number , scaffolds: string[]) {
        const mcs: ISiteMaterialsPatch = {
            blocks: [],
            components: [],
            scaffolds,
        };
        return this.addMaterials(siteId, mcs);
    }
}

export default Site;
