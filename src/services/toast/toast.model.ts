export class WarningException {
    public code?: number;
    public message?: string;

    constructor(message = '', code = -1) {
        this.message = message;
        this.code = code
    }
}

