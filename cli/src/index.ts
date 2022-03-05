#!/usr/local/bin/node --experimental-specifier-resolution=node

import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { V_LATEST } from 'gdu-common';
import SheetOptions from './commands/options';

import NewProjectCommand from './commands/new-project';
import EditProjectCommand from './commands/edit-project';
import PublishProjectCommand from './commands/publish-project';
import AddImagesCommand from './commands/add-images';
import RemoveImagesCommand from './commands/remove-images';

import AboutDeveloperCommand from './commands/about-developer';
import AboutLicenseCommand from './commands/about-license';
import AboutLibsCommand from './commands/about-libs';

import HelpCommand from './commands/help';
// import UsageCommand from './commands/usage';

import 'colors';
import path from "path";

// import { version } from './package.json';

// console.error(process.env.npm_package_version);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

SheetOptions.AppendOptions(yargs(hideBin(process.argv)))
    // .version( version )
    // .version( { "version": V_LATEST } )
    .version( V_LATEST )
    .scriptName('gdu-sheets')
    // .usage("$0 <cmd> [args]")

    .command(new NewProjectCommand())
    .command(new EditProjectCommand())
    .command(new AddImagesCommand())
    .command(new RemoveImagesCommand())
    .command(new PublishProjectCommand())

    .command(new AboutDeveloperCommand())
    .command(new AboutLicenseCommand())
    .command(new AboutLibsCommand())

    .command(new HelpCommand())
    // .command(new UsageCommand())

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

// export default {
//     command: "<sheets> <command>",
//     describe: "create, modify, and publish sprite sheets",
//     builder: (args) => {
//
//
//     },
//     handler: (args: Arguments) => {
//         let cmd: string = "" || args && args["command"] as string;
//         if(cmd.length) {
//             console.error(`Unknown command, '${cmd}'.`.red);
//         }
//         yargs.showHidden(true).showHelp();
//     },
// } as CommandModule<{}, unknown>;



// SheetsOptions
//     .AppendOptions(yargs(hideBin(process.argv)))
//     // .usage("$0 sheets command [options]")
//     .version( require("../package").version )
//     .command(SheetsModule)





//     .command({
//         command: '*',
//         handler: (args: Arguments) => {
//             let prompt = `'${args.$0} sheets help --show-hidden'`.green;
//             console.log("Missing command. Must be in the form " + prompt + ".");
//         }
//     })
//     .argv;
//     // console.log("Specify --show-hidden for available options");
//
//
// // SheetsOptions
// //     .AppendOptions(yargs(hideBin(process.argv)))
// //     // .usage("$0 sheets command [options]")
// //     .version( require("../package").version )
// //     .command(SheetsModule)
// //     .command({
// //         command: '*',
// //         handler: (args: Arguments) => {
// //             let prompt = `'${args.$0} sheets help --show-hidden'`.green;
// //             console.log("Missing command. Must be in the form " + prompt + ".");
// //         }
// //     })
// //     .argv;
// //     // console.log("Specify --show-hidden for available options");
