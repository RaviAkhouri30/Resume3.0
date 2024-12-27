export interface INotification {
    showMessage(message: number): void;
    showSuccess(message: number): void;
    showError(message: number): void;
}
