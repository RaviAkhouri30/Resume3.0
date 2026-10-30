import { Command } from "../enums/command";
import { Context } from "../enums/context";
import { CommandModel } from "../models/command";

/** Copies `dataItem` to the clipboard and confirms with "`label` copied!". */
export class CopyCommand<T> extends CommandModel<T> {

    constructor(context: Context, dataItem: T, label: string) {
        super(context, dataItem, Command.copy, `${label} copied!`);
    }
}
