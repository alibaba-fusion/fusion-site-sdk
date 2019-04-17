
import Debug from "debug";
const debug = Debug("fusion-sdk:user");
import { AxiosInstance } from "axios";
import {IFusionSite} from "../type";

async function getSites(instance: AxiosInstance): Promise<IFusionSite[]> {
    const url = "/api/v1/mysites";
    const res = await instance.get(url);
    if (!res.data.success) {
        const err = new Error("fail to get sites");
        (err as any).response = res;
        throw err;
    }
    debug("%o", res.data.data);
    return res.data.data as IFusionSite[];
}

const user = {
    getSites,
};

export default user;
