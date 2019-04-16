
export enum Env {
    prod = "prod",
    pre = "pre",
    daily = "daily",
    local = "local",
    aliprod = "aliprod",
    alipre = "alipre",
    alidaily = "alidaily",
}

export interface IClientConstructorProps {
    token: string;
    env?: Env;
}
