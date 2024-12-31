import { Command } from "../enums/command";
import { Context } from "../enums/context";
import { CommandModel } from "../models/command";

export class CopyCommand<T> extends CommandModel<T> {

    // Constructor to initialize the copy command
    constructor(context: Context, dataItem: T, message: string) {
        // Call the parent constructor with context, data item, empty array, command type, and message
        super(context, dataItem, [], Command.copy, message + ' copied!');
    }
}
