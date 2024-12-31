export interface INotification {
    showMessage(message: string, action: string): void;
    showSuccess(message: number): void;
    showError(errorCode: number, message: string): void;
}
