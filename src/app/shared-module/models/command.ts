import { Command } from "../enums/command";
import { Context } from "../enums/context";
import { ICommand } from "../interfaces/i-command";

/** Immutable command message; a command describes intent and is never edited after creation. */
export class CommandModel<T> implements ICommand<T> {

    constructor(
        public readonly context: Context,
        public readonly dataItem: T,
        public readonly command: Command,
        public readonly message: string
    ) { }
}
