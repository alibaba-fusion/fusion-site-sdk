
import Debug from "debug";
const debug = Debug("fusion-sdk:user");
import getAioxs from "./http";
import {IFusionSite} from '../type'; 

async function getSites(): Promise<Array<IFusionSite>> {
    const url = "/api/v1/mysites";
    const res = await getAioxs().get(url);
    if (!res.data.success) {
        throw new Error('fail to get sites');
    }
    debug('%o', res.data.data);
    return res.data.data as Array<IFusionSite>;
}

const user = {
    getSites,
};

export default user;
