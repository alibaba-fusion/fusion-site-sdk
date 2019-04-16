import { Env, IClientConstructorProps } from "./type";

export class FusionSiteClient {
    public env: Env;
    private token: string;

    constructor(props: string | IClientConstructorProps) {
        if (typeof props === "string") {
            this.token = props;
            this.env = Env.prod;
        } else {
            this.token = props.token;
            this.env = props.env || Env.prod;
        }
    }

    public setToken(token: string) {
        this.token = token;
    }

    public getToken() {
        return this.token;
    }

    public getEnv() {
        return this.env;
    }
}
