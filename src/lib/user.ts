import getAioxs from "./http";

async function getSites() {
    const url = "/api/v1/mysites";
    const res = await getAioxs().get(url);
    console.log();
}
