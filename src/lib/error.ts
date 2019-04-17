export class UnauthorizeError extends Error {
    public response: any;
    constructor() {
        super("Token Auth fail");
        this.name = 'UnauthorizeError';
    }
}
