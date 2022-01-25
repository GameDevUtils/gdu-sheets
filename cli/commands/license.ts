import {Arguments /*, CommandModule*/} from 'yargs';
import ArgsUtil, {ValidatedResult} from "./args-util";
import ExtCommandModule from './helpers/ExtCommandModule';

export default class LicenseCommandModule extends ExtCommandModule {
    constructor() {
        super();
        this._command = "license";
        this._describe = "display license text";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments):void {
        this.handlerResult = ArgsUtil.Validate(args,"license", false, false);
        if(this.handlerResult.hasNoError) {
            console.log(LicenseCommandModule.helpText);
        }
    }

    static get helpText(): string {
        return `
MIT License

Copyright (c) 2016-${new Date().getFullYear()} Joseph B. Hall (@groundh0g)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
    }
}
