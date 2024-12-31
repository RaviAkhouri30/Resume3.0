import { Command } from "../enums/command";
import { Context } from "../enums/context";

export interface ICommand<T> {
    context: Context;
    dataItem: T;
    multipleDataItems: T[];
    command: Command;
    message: string;
}
