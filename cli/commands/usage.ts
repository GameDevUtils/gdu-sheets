// import yargs, {Arguments, CommandBuilder /*, CommandModule*/} from 'yargs';
// import 'colors';
// import ArgsUtil, {ValidatedResult} from "./args-util";
// import ExtCommandModule from './helpers/ExtCommandModule';
//
// export default class UsageCommandModule extends ExtCommandModule {
//     constructor() {
//         super();
//
//         this._command = "usage";
//         this._describe = "display app usage";
//         this._builder = undefined;
//         this._handlerResult = new ValidatedResult();
//     }
//
//     // _handlerResult: ValidatedResult;
//     // get handlerResult() : ValidatedResult { return this._handlerResult; };
//     // set handlerResult(value) { this._handlerResult = value; };
//
//     handler(args: Arguments) {
//         this.handlerResult = ArgsUtil.Validate(args,"usage", false, false);
//         if(this.handlerResult.hasNoError) {
//             // console.log('hello, ', result);
//         }
//     }
// }
