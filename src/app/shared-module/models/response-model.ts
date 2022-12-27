/**
 * @description Response Model of Generic Type.
 */
export class ResponseModel<T> {
    private statusCode: number;
    private data: T;
    private messasge: string;

    constructor(data: T){
        this.statusCode = 200;
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
