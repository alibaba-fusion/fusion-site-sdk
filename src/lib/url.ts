import {Env} from "../type";

const URLS = {
    [Env.prod]: "aHR0cHM6Ly9mdXNpb24uZGVzaWdu",
    [Env.pre]: "aHR0cHM6Ly9wcmUtd3d3LmZ1c2lvbi5kZXNpZ24=",
    [Env.daily]: "aHR0cHM6Ly9mdXNpb24udGFvYmFvLm5ldA==",
    [Env.local]: "aHR0cDovLzEyNy4wLjAuMTo3MDAx",
    [Env.alidaily]: "aHR0cHM6Ly9mdXNpb24uYWxpYmFiYS5uZXQ",
    [Env.alipre]: "aHR0cHM6Ly9wcmUtZnVzaW9uLmFsaWJhYmEtaW5jLmNvbQ==",
    [Env.aliprod]: "aHR0cHM6Ly9mdXNpb24uYWxpYmFiYS1pbmMuY29t",
};

export default function getUrl(env?: Env): string {
    if (!env) {
        env = Env.prod;
    }
    const str = URLS[env];
    return Buffer.from(str, "base64").toString("utf-8");
}
