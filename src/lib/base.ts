import { AxiosInstance } from "axios";

export default class BaseHttpClient {
    public client: AxiosInstance;
    constructor(client: AxiosInstance) {
        this.client = client;
    }

    public setClient(client: AxiosInstance) {
        this.client = client;
    }
}
