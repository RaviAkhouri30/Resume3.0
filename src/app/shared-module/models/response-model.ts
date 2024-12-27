import { IResponseModel } from "../interfaces/i-response-model";

/**
 * @description Response Model of Generic Type T.
 */
export class ResponseModel<T> implements IResponseModel<T> {
    private _statusCode!: statusCodeType;
    private _data: T;
    private _messasge!: string;

    constructor(data: T) {
        this._data = data;
        this.setStatuscodeAndMessage();
    }

    public get statusCode(): statusCodeType {
        return this._statusCode;
    }

    public get data(): T {
        return this._data;
    }

    public get message(): string {
        return this._messasge;
    }

    private setStatuscodeAndMessage = (): void => {
        if (!this._data) {
            this._statusCode = statusCodeType.failed;
            this._messasge = 'Data not found';
            return;
        }
        this._statusCode = statusCodeType.success;
        this._messasge = 'Data has been fetched successfully';
     }

}

export enum statusCodeType {
    success = 200,
    failed = 400
}