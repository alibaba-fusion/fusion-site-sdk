import createInstace from "./lib/http";
import Site from "./lib/site";
import User from "./lib/user";
import { Env, IClientConstructorProps } from "./type";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export default class FusionSiteClient {
    get env() {
        return this._env;
    }
    public static ENV = Env;
    public token: string;
    public site: Site;
    public user: User;
    private _env: Env;
    constructor(props: string | IClientConstructorProps) {
        if (typeof props === "string") {
            this.token = props;
            this._env = Env.prod;
        } else {
            this.token = props.token;
            this._env = props.env || Env.prod;
        }
        const instance = createInstace(this.token, this._env);
        this.site = new Site(instance);
        this.user = new User(instance);
    }

    public setToken(token: string) {
        this.token = token;
        const instance = createInstace(this.token, this._env);
        this.site.setClient(instance);
        this.user.setClient(instance);
    }

    public getToken() {
        return this.token;
    }
}
