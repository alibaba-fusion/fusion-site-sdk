import { Env, IClientConstructorProps } from "./type";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export class FusionSiteClient {

    get env() {
        return this._env;
    }
    public token: string;
    private _env: Env;

    constructor(props: string | IClientConstructorProps) {
        if (typeof props === "string") {
            this.token = props;
            this._env = Env.prod;
        } else {
            this.token = props.token;
            this._env = props.env || Env.prod;
        }
    }

    public setToken(token: string) {
        this.token = token;
    }

    public getToken() {
        return this.token;
    }
}
