import { Command } from "../enums/command";
import { Context } from "../enums/context";
import { CommandModel } from "../models/command";

export class CopyCommand<T> extends CommandModel<T> {

    constructor(context: Context, dataItem: T, message: string) {
        super(context, dataItem, [], Command.copy, message + ' copied!');
    }
}
