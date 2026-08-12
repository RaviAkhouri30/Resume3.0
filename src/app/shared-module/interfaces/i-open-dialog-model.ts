import { ICommand } from "./i-command";

export interface IOpenDialogModel<T> extends ICommand<T> {
    dialogTitle: string;
    data?: T;
    template?: HTMLTemplateElement;
    footer?: HTMLTemplateElement;
}
