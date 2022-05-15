// import ArgsUtil, {ValidatedResult} from "./args-util";
import AddImagesCommandModule from './add';
import /*yargs,*/ {Arguments, Argv} from "yargs";

describe("add images command", () => {
    test("should add images to the project", () => {
        const addImages = new AddImagesCommandModule();
        const argv  = {
            _: ["add"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
                "../public/logo192.png",
                "../public/favicon260.png",
                "../public/android-chrome-192x192.png",
                "../public/mstile-150x150.png"]
        } as Arguments<{}>;


        expect(addImages.command).toBe("add <path> <images..>");
        addImages.handler(argv as Arguments);
        expect(addImages.handlerResult.command).toBe("add");

        expect(addImages.hasNoError).toBe(true);
        expect(addImages.hasError).toBe(false);
        expect(addImages.aliases).toBe(undefined);
        expect(addImages.builder).toBe(undefined);
        expect(addImages.deprecated).toBe(undefined);
        expect(addImages.describe).toBe("add image(s) to project");
    });
});
