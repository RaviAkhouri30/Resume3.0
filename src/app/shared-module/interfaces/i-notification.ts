export interface INotification {
    showMessage(message: string, action: string): void;
    showSuccess(message: string): void;
    showError(errorCode: number, message: string): void;
}
