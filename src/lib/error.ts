/* tslint:disable:max-classes-per-file */
export class UnauthorizeError extends Error {
    public response: any;
    constructor() {
        super("Token Auth fail");
        this.name = "UnauthorizeError";
    }
}

export class ResponseFailError extends Error {
    public response: any;
    constructor() {
        super("Success=false in Response");
        this.name = "ResponseFailError";
    }
}
