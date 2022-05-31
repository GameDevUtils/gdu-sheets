import {MESSAGE_TYPE} from "../objs/messages";
import {LogUtil, LogTo} from "./LogUtil";

describe("LogUtil", () => {

    const doNothing = () => { return undefined; };

    beforeAll(() => {
        jest.spyOn(console, "debug").mockImplementation(doNothing);
        jest.spyOn(console, "info").mockImplementation(doNothing);
        jest.spyOn(console, "log").mockImplementation(doNothing);
        jest.spyOn(console, "warn").mockImplementation(doNothing);
        jest.spyOn(console, "error").mockImplementation(doNothing);
        LogUtil.OutputModule = console;
    });

    afterAll(() => {
        jest.restoreAllMocks();
        LogUtil.LogLevel = MESSAGE_TYPE.WARN as number;
    });

    beforeEach(() => {
        jest.clearAllMocks();
        LogUtil.LogLevel = MESSAGE_TYPE.DEBUG as number;
        LogUtil.IncludePrefix = false;
        LogUtil.Clear();
    });

    test("logs messages with types, w/o prefix", () => {
        LogUtil.IncludePrefix = false;

        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, "This is a debug message.");
        LogUtil.LogMessage(MESSAGE_TYPE.WARN, "This is a warning.");
        LogUtil.LogMessage(MESSAGE_TYPE.INFO, "This is an info message.");
        LogUtil.LogMessage(MESSAGE_TYPE.LOG, "This is a generic log message.");
        LogUtil.LogMessage(MESSAGE_TYPE.ERROR, "This is an error message.");

        expect(console.debug).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.debug).toHaveBeenLastCalledWith("This is a debug message.");
        expect(console.info).toHaveBeenLastCalledWith("This is an info message.");
        expect(console.log).toHaveBeenLastCalledWith("This is a generic log message.");
        expect(console.warn).toHaveBeenLastCalledWith("This is a warning.");
        expect(console.error).toHaveBeenLastCalledWith("This is an error message.");
    });

    test("logs messages with types, w/ prefix", () => {
        LogUtil.IncludePrefix = true;

        LogUtil.LogMessage(MESSAGE_TYPE.WARN, "This is a warning.");
        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, "This is a debug message.");
        LogUtil.LogMessage(MESSAGE_TYPE.ERROR, "This is an error message.");

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.debug).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.warn).toHaveBeenLastCalledWith("WARN: This is a warning.");
        expect(console.debug).toHaveBeenLastCalledWith("DEBUG: This is a debug message.");
        expect(console.error).toHaveBeenLastCalledWith("ERROR: This is an error message.");
    });

    test("logs messages with more data", () => {
        LogUtil.IncludePrefix = true;

        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, "This is a debug message.", "More debug info.");
        LogUtil.LogMessage(MESSAGE_TYPE.INFO, "This is an info message.", "More info.");
        LogUtil.LogMessage(MESSAGE_TYPE.LOG, "This is a log.", "More log info.");
        LogUtil.LogMessage(MESSAGE_TYPE.WARN, "This is a warning.", "More warning info.");
        LogUtil.LogMessage(MESSAGE_TYPE.ERROR, "This is an error message.", "More error info.");

        expect(console.debug).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.debug).toHaveBeenLastCalledWith("DEBUG: This is a debug message.\nMore debug info.");
        expect(console.info).toHaveBeenLastCalledWith("INFO: This is an info message.\nMore info.");
        expect(console.log).toHaveBeenLastCalledWith("LOG: This is a log.\nMore log info.");
        expect(console.warn).toHaveBeenLastCalledWith("WARN: This is a warning.\nMore warning info.");
        expect(console.error).toHaveBeenLastCalledWith("ERROR: This is an error message.\nMore error info.");
    });

    test("logs messages with more data", () => {
        LogUtil.IncludePrefix = true;

        LogUtil.LogMessage(MESSAGE_TYPE.WARN, "This is a warning.", { message: "More warning info." });
        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, "This is a debug message.", { message: "More debug info." });
        LogUtil.LogMessage(MESSAGE_TYPE.ERROR, "This is an error message.", { message: "More error info." });

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.debug).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.warn).toHaveBeenLastCalledWith('WARN: This is a warning.\n{"message":"More warning info."}');
        expect(console.debug).toHaveBeenLastCalledWith('DEBUG: This is a debug message.\n{"message":"More debug info."}');
        expect(console.error).toHaveBeenLastCalledWith('ERROR: This is an error message.\n{"message":"More error info."}');
    });

    test("clears logged messages", () => {
        LogUtil.IncludePrefix = true;

        LogUtil.LogMessage(MESSAGE_TYPE.WARN, "This is a warning.");
        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, "This is a debug message.");
        LogUtil.LogMessage(MESSAGE_TYPE.ERROR, "This is an error message.");
        LogUtil.LogMessage(MESSAGE_TYPE.ERROR, "This is another error message.");

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.debug).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(2);
        expect(LogUtil._messages?.length).toBe(4);

        LogUtil.Clear();

        expect(LogUtil._messages?.length).toBe(0);
    });

});
