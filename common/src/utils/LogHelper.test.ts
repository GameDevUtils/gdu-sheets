import LogHelper, {LogFunction, LogTo, MessageTypes} from "./LogHelper";
import SpyInstance = jest.SpyInstance;

describe("LogHelper", () => {

    const CreateMocks = () => {
        return {
            debug: jest.spyOn(console, "debug").mockImplementation(() => {
            }),
            error: jest.spyOn(console, "error").mockImplementation(() => {
            }),
            log: jest.spyOn(console, "log").mockImplementation(() => {
            }),
            info: jest.spyOn(console, "info").mockImplementation(() => {
            }),
            warn: jest.spyOn(console, "warn").mockImplementation(() => {
            }),
            clear: jest.spyOn(console, "clear").mockImplementation(() => {
            }),
        };
    };

    type SpyOnConsole = {
        debug: SpyInstance;
        info: SpyInstance;
        log: SpyInstance;
        warn: SpyInstance;
        error: SpyInstance;
        clear?: SpyInstance;
    };

    const RestoreMocks = (mocks: SpyOnConsole) => {
        mocks.debug?.mockRestore();
        mocks.error?.mockRestore();
        mocks.log?.mockRestore();
        mocks.info?.mockRestore();
        mocks.warn?.mockRestore();
        mocks.clear?.mockRestore();
    };

    let mocks: any = undefined;
    let spy: SpyInstance;

    describe("General tests", () => {

        beforeAll(() => {
            LogHelper.OutputModule = console;
            spy = jest.spyOn(LogHelper, "LogMessage");
            mocks = CreateMocks();
            jest.clearAllMocks();
        });

        beforeEach(() => {
            LogHelper.IncludePrefix = false;
            LogHelper.LogLevel = "DEBUG";
            jest.clearAllMocks();
        });

        afterAll(() => {
            LogHelper.OutputModule = undefined;
            spy.mockRestore();
            RestoreMocks(mocks);
            jest.clearAllMocks();
        });

        const TestMessage = (msgType: MessageTypes) => `This is a ${msgType} message.`;
        const LogTestMessage = (msgType: MessageTypes) => LogHelper.LogMessage(msgType, TestMessage(msgType));

        test("LogMessage logs messages by type", () => {
            LogTestMessage("DEBUG");
            LogTestMessage("ERROR");
            LogTestMessage("LOG");
            LogTestMessage("INFO");
            LogTestMessage("WARN");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.debug).toHaveBeenNthCalledWith(1, TestMessage("DEBUG"));
            expect(mocks.error).toHaveBeenNthCalledWith(1, TestMessage("ERROR"));
            expect(mocks.log).toHaveBeenNthCalledWith(1, TestMessage("LOG"));
            expect(mocks.info).toHaveBeenNthCalledWith(1, TestMessage("INFO"));
            expect(mocks.warn).toHaveBeenNthCalledWith(1, TestMessage("WARN"));
        });

        test("LogMessage logs messages by type, with message type prefix", () => {
            LogHelper.IncludePrefix = true;
            LogTestMessage("DEBUG");
            LogTestMessage("ERROR");
            LogTestMessage("LOG");
            LogTestMessage("INFO");
            LogTestMessage("WARN");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.debug).toHaveBeenNthCalledWith(1, "DEBUG: " + TestMessage("DEBUG"));
            expect(mocks.error).toHaveBeenNthCalledWith(1, "ERROR: " + TestMessage("ERROR"));
            expect(mocks.log).toHaveBeenNthCalledWith(1, "LOG: " + TestMessage("LOG"));
            expect(mocks.info).toHaveBeenNthCalledWith(1, "INFO: " + TestMessage("INFO"));
            expect(mocks.warn).toHaveBeenNthCalledWith(1, "WARN: " + TestMessage("WARN"));
        });

        test("LogHelper.Clear() clears messages", () => {
           LogHelper.LogMessage("DEBUG", "Hello there.");
            LogHelper.LogMessage("DEBUG", "This is a test.");

            expect(LogHelper._messages.length === 2);

            LogHelper.Clear();

            expect(mocks.debug).toHaveBeenCalledTimes(2);
            expect(LogHelper._messages.length === 0);
        });

        test("LogMessage supports extra data parameter for DEBUG message type", () => {
            LogHelper.LogMessage("DEBUG", "Test string.", "Hello, world!");
            LogHelper.LogMessage("DEBUG", "Test object.", {a: 1, b: 'test'});

            expect(mocks.debug).toHaveBeenNthCalledWith(1, "Test string.");
            expect(mocks.debug).toHaveBeenNthCalledWith(2, "Hello, world!");
            expect(mocks.debug).toHaveBeenNthCalledWith(3, "Test object.");
            expect(mocks.debug).toHaveBeenNthCalledWith(4, JSON.stringify({a: 1, b: 'test'}, null, 3));
        });

        test("LogMessage supports extra data parameter for ERROR message type", () => {
            LogHelper.LogMessage("ERROR", "Test string.", "Hello, world!");
            LogHelper.LogMessage("ERROR", "Test object.", {a: 1, b: 'test'});

            expect(mocks.error).toHaveBeenNthCalledWith(1, "Test string.");
            expect(mocks.error).toHaveBeenNthCalledWith(2, "Hello, world!");
            expect(mocks.error).toHaveBeenNthCalledWith(3, "Test object.");
            expect(mocks.error).toHaveBeenNthCalledWith(4, JSON.stringify({a: 1, b: 'test'}, null, 3));
        });

        test("LogMessage supports extra data parameter for LOG message type", () => {
            LogHelper.LogMessage("LOG", "Test string.", "Hello, world!");
            LogHelper.LogMessage("LOG", "Test object.", {a: 1, b: 'test'});

            expect(mocks.log).toHaveBeenNthCalledWith(1, "Test string.");
            expect(mocks.log).toHaveBeenNthCalledWith(2, "Hello, world!");
            expect(mocks.log).toHaveBeenNthCalledWith(3, "Test object.");
            expect(mocks.log).toHaveBeenNthCalledWith(4, JSON.stringify({a: 1, b: 'test'}, null, 3));
        });

        test("LogMessage supports extra data parameter for INFO message type", () => {
            LogHelper.LogMessage("INFO", "Test string.", "Hello, world!");
            LogHelper.LogMessage("INFO", "Test object.", {a: 1, b: 'test'});

            expect(mocks.info).toHaveBeenNthCalledWith(1, "Test string.");
            expect(mocks.info).toHaveBeenNthCalledWith(2, "Hello, world!");
            expect(mocks.info).toHaveBeenNthCalledWith(3, "Test object.");
            expect(mocks.info).toHaveBeenNthCalledWith(4, JSON.stringify({a: 1, b: 'test'}, null, 3));
        });

        test("LogMessage supports extra data parameter for WARN message type", () => {
            LogHelper.LogMessage("WARN", "Test string.", "Hello, world!");
            LogHelper.LogMessage("WARN", "Test object.", {a: 1, b: 'test'});

            expect(mocks.warn).toHaveBeenNthCalledWith(1, "Test string.");
            expect(mocks.warn).toHaveBeenNthCalledWith(2, "Hello, world!");
            expect(mocks.warn).toHaveBeenNthCalledWith(3, "Test object.");
            expect(mocks.warn).toHaveBeenNthCalledWith(4, JSON.stringify({a: 1, b: 'test'}, null, 3));
        });

    });

    describe("LogMessage suppresses messages when LogLevel is specified", () => {

        beforeAll(() => {
            LogHelper.OutputModule = console;
            spy = jest.spyOn(LogHelper, "LogMessage");
            mocks = CreateMocks();
        });

        beforeEach(() => {
            jest.clearAllMocks();
        });

        afterAll(() => {
            LogHelper.OutputModule = undefined;
            spy.mockRestore();
            RestoreMocks(mocks);
            jest.clearAllMocks();
        });

        test("LogLevel DEBUG", () => {
            LogHelper.LogLevel = "DEBUG";
            LogHelper.IncludePrefix = true;

            LogHelper.LogMessage("DEBUG", "debug");
            LogHelper.LogMessage("ERROR", "error");
            LogHelper.LogMessage("LOG", "log");
            LogHelper.LogMessage("INFO", "info");
            LogHelper.LogMessage("WARN", "warn");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.error).toHaveBeenNthCalledWith(1, "ERROR: error");
            expect(mocks.warn).toHaveBeenNthCalledWith(1, "WARN: warn");
            expect(mocks.log).toHaveBeenNthCalledWith(1, "LOG: log");
            expect(mocks.info).toHaveBeenNthCalledWith(1, "INFO: info");
            expect(mocks.debug).toHaveBeenNthCalledWith(1, "DEBUG: debug");
        });

        test("LogLevel INFO", () => {
            LogHelper.LogLevel = "INFO";
            LogHelper.IncludePrefix = true;

            LogHelper.LogMessage("DEBUG", "debug");
            LogHelper.LogMessage("ERROR", "error");
            LogHelper.LogMessage("LOG", "log");
            LogHelper.LogMessage("INFO", "info");
            LogHelper.LogMessage("WARN", "warn");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.error).toHaveBeenNthCalledWith(1, "ERROR: error");
            expect(mocks.warn).toHaveBeenNthCalledWith(1, "WARN: warn");
            expect(mocks.log).toHaveBeenNthCalledWith(1, "LOG: log");
            expect(mocks.info).toHaveBeenNthCalledWith(1, "INFO: info");
            expect(mocks.debug).not.toHaveBeenCalled();
        });

        test("LogLevel LOG", () => {
            LogHelper.LogLevel = "LOG";
            LogHelper.IncludePrefix = true;

            LogHelper.LogMessage("DEBUG", "debug");
            LogHelper.LogMessage("ERROR", "error");
            LogHelper.LogMessage("LOG", "log");
            LogHelper.LogMessage("INFO", "info");
            LogHelper.LogMessage("WARN", "warn");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.error).toHaveBeenNthCalledWith(1, "ERROR: error");
            expect(mocks.warn).toHaveBeenNthCalledWith(1, "WARN: warn");
            expect(mocks.log).toHaveBeenNthCalledWith(1, "LOG: log");
            expect(mocks.info).not.toHaveBeenCalled();
            expect(mocks.debug).not.toHaveBeenCalled();
        });

        test("LogLevel WARN", () => {
            LogHelper.LogLevel = "WARN";
            LogHelper.IncludePrefix = true;

            LogHelper.LogMessage("DEBUG", "debug");
            LogHelper.LogMessage("ERROR", "error");
            LogHelper.LogMessage("LOG", "log");
            LogHelper.LogMessage("INFO", "info");
            LogHelper.LogMessage("WARN", "warn");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.error).toHaveBeenNthCalledWith(1, "ERROR: error");
            expect(mocks.warn).toHaveBeenNthCalledWith(1, "WARN: warn");
            expect(mocks.log).not.toHaveBeenCalled();
            expect(mocks.info).not.toHaveBeenCalled();
            expect(mocks.debug).not.toHaveBeenCalled();
        });

        test("LogLevel ERROR", () => {
            LogHelper.LogLevel = "ERROR";
            LogHelper.IncludePrefix = true;

            LogHelper.LogMessage("DEBUG", "debug");
            LogHelper.LogMessage("ERROR", "error");
            LogHelper.LogMessage("LOG", "log");
            LogHelper.LogMessage("INFO", "info");
            LogHelper.LogMessage("WARN", "warn");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.error).toHaveBeenNthCalledWith(1, "ERROR: error");
            expect(mocks.warn).not.toHaveBeenCalled();
            expect(mocks.log).not.toHaveBeenCalled();
            expect(mocks.info).not.toHaveBeenCalled();
            expect(mocks.debug).not.toHaveBeenCalled();
        });

        test("LogLevel SILENT", () => {
            LogHelper.LogLevel = "SILENT";
            LogHelper.IncludePrefix = true;

            LogHelper.LogMessage("DEBUG", "debug");
            LogHelper.LogMessage("ERROR", "error");
            LogHelper.LogMessage("LOG", "log");
            LogHelper.LogMessage("INFO", "info");
            LogHelper.LogMessage("WARN", "warn");

            expect(spy).toHaveBeenCalledTimes(5);
            expect(mocks.error).not.toHaveBeenCalled();
            expect(mocks.warn).not.toHaveBeenCalled();
            expect(mocks.log).not.toHaveBeenCalled();
            expect(mocks.info).not.toHaveBeenCalled();
            expect(mocks.debug).not.toHaveBeenCalled();
        });

    });

});