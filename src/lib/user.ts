
import Debug from "debug";
const debug = Debug("fusion-sdk:user");
import {IFusionSite} from "../type";
import BaseHttpClient from "./base";

class User extends BaseHttpClient {
    public async getSites(): Promise<IFusionSite[]> {
        const url = "/api/v1/mysites";
        const res = await this.client.get(url);
        debug("%o", res.data.data);
        return res.data.data as IFusionSite[];
    }
    public async checkToken(): Promise<boolean> {
        const url = "/api/v1/istokenvalid";
        try {
            const res = await this.client.head(url);
            if (res.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default User;
