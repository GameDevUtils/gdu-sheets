#!/usr/local/bin/node

// #!/usr/local/bin/node --experimental-specifier-resolution=node

import yargs, {Arguments} from 'yargs';
import {hideBin} from 'yargs/helpers';
import SheetOptions from './commands/options';

import NewProjectCommand from './commands/project/new';
import EditProjectCommand from './commands/project/edit';
import PublishProjectCommand from './commands/project/publish';
import AddImagesCommand from './commands/image/add';
import RemoveImagesCommand from './commands/image/remove';

import AboutDeveloperCommand from './commands/about/developer';
import AboutLicenseCommand from './commands/about/license';
import AboutLibsCommand from './commands/about/libs';

import HelpCommand from './commands/help';

import 'colors';
import path from "path";
import {APPLICATION_VERSION} from "gdu-common/build/utils/AppUtil";
import LogUtil, {LogTo} from "gdu-common/build/utils/LogUtil";
import {MESSAGE_TYPE} from "gdu-common/build/objs/messages";

(() => {
    LogUtil.OutputModule = console;
    LogUtil.LogLevel = MESSAGE_TYPE.WARN;

    SheetOptions.AppendOptions(yargs(hideBin(process.argv)))
        // .version(
        //     '--version',
        //     AppConstants.APPLICATION_DESCRIPTION[V_LATEST_KEY],
        //     V_LATEST )
        .version( APPLICATION_VERSION.CURRENT )
        .scriptName('sheets')
        .usage("$0 <cmd> [args]")

        .command(new NewProjectCommand())
        .command(new EditProjectCommand())
        .command(new AddImagesCommand())
        .command(new RemoveImagesCommand())
        .command(new PublishProjectCommand())

        .command(new AboutDeveloperCommand())
        .command(new AboutLicenseCommand())
        .command(new AboutLibsCommand())

        .command(new HelpCommand())

        // .command({
        //     command: '*',
        //     // handler: undefined,
        //     handler: (args: Arguments) => {
        //         const prompt1 = `'${path.basename(args.$0)} help'`.green;
        //         // const prompt2 = `'${path.basename(args.$0)} help --show-hidden'`.green;
        //         // // let prompt = `'gdusheets help --show-hidden'`.green;
        //         console.log("Missing or unknown command. Run " + prompt1 + " for a list of commands.");
        //         // console.log("Run " + prompt2 + " for details.");
        //     }
        // })
        // .demandCommand(1, 1)

        .command({
            command: '*',
            // handler: undefined,
            handler: (args: Arguments) => {
                const prompt1 = `'${path.basename(args.$0)} help'`.green;
                // const prompt2 = `'${path.basename(args.$0)} help --show-hidden'`.green;
                // // let prompt = `'gdusheets help --show-hidden'`.green;
                console.log("Missing or unknown command. Run " + prompt1 + " for a list of commands.");
                // console.log("Run " + prompt2 + " for details.");
            }
        })

        .recommendCommands()
        .argv;
})();

