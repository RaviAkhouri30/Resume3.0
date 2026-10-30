import { Command } from "../enums/command";
import { Context } from "../enums/context";

export interface ICommand<T> {
    readonly context: Context;
    readonly dataItem: T;
    readonly command: Command;
    readonly message: string;
}
