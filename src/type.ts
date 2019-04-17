
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

export interface IFusionSite {
    id: number,
    name: string,
    company: string,
    subdomain: string,
    logo: string,
    permission: number,
    lib_id: number,
    lib_name: string,
    npm: string,
    lib_baseline: string,
    default_theme: number,
    doc_id?: number,
    en_doc_id?: number,
    status: number,
    style: number,
    tpl: string,
    creator_id: string,
    gmt_create: string,
    gmt_modified: string,
    clone_tpl_type: number
}