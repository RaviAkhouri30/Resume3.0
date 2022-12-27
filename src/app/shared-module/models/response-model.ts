/**
 * @description Response Model of Generic Type T.
 */
export class ResponseModel<T> {
    private statusCode: statusCodeType;
    private data: T;
    private messasge: string;

    constructor(data: T) {
        this.statusCode = statusCodeType.success;
        this.data = data;
        this.messasge = 'Data has been fetched successfully';
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }

    public getData(): T {
        return this.data;
    }

    public setData(data: T): void {
        this.data = data;
    }

    public getMessasge(): string {
        return this.messasge;
    }

    public setMessasge(messasge: string): void {
        this.messasge = messasge;
    }

}

export enum statusCodeType {
    success = 200
}