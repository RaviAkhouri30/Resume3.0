import { Command } from "../enums/command";
import { Context } from "../enums/context";
import { IDownload } from "../interfaces/i-download";
import { CommandModel } from "../models/command";

export class DownloadCommand<T = IDownload> extends CommandModel<T> {

    constructor(context: Context, dataItem: T) {
        super(context, dataItem, [], Command.download, 'Download success!');
    }
}
