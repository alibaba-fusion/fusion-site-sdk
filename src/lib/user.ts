
import Debug from "debug";
const debug = Debug("fusion-sdk:user");
import { AxiosInstance } from "axios";
import {IFusionSite} from "../type";
import BaseHttpClient from "./base";

class User extends BaseHttpClient {
    public async getSites(): Promise<IFusionSite[]> {
        const url = "/api/v1/mysites";
        const res = await this.client.get(url);
        if (!res.data.success) {
            const err = new Error("fail to get sites");
            (err as any).response = res;
            throw err;
        }
        debug("%o", res.data.data);
        return res.data.data as IFusionSite[];
    }
}

export default User;
