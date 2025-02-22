import { Command } from "../enums/command";
import { Context } from "../enums/context";
import { ICommand } from "../interfaces/i-command";

export class CommandModel<T> implements ICommand<T> {
    // Private properties to hold command details
    private _context: Context;
    private _dataItem: T;
    private _multipleDataItems: T[];
    private _command: Command;
    private _message: string;

    // Constructor to initialize command model
    constructor(context: Context, dataItem: T, multipleDataItems: T[], command: Command, message: string) {
        this._context = context;
        this._dataItem = dataItem;
        this._multipleDataItems = multipleDataItems;
        this._command = command;
        this._message = message;
    }

    // Getter and setter for context
    public get context(): Context {
        return this._context;
    }

    public set context(value: Context) {
        this._context = value;
    }

    // Getter and setter for data item
    public get dataItem(): T {
        return this._dataItem;
    }

    public set dataItem(value: T) {
        this._dataItem = value;
    }

    // Getter and setter for multiple data items
    public get multipleDataItems(): T[] {
        return this._multipleDataItems;
    }

    public set multipleDataItems(value: T[]) {
        this._multipleDataItems = value;
    }

    // Getter and setter for command
    public get command(): Command {
        return this._command;
    }

    public set command(value: Command) {
        this._command = value;
    }

    // Getter and setter for message
    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }
}
