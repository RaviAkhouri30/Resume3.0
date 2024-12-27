export interface IResponseModel<T> {
    statusCode: number;
    message: string;
    data: T;
}
