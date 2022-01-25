import AuthorCommandModule from './author';
import {Arguments} from "yargs";

describe("author command", () => {
    let mockConsole : jest.MockedFunction<any>;

    beforeAll(() => {
        mockConsole = jest.spyOn(console, 'log');
    });

    beforeEach(() => {
        mockConsole.mockReset();
    });

    afterAll(() => {
        mockConsole.mockRestore();
    });

    test("should display author bio.", () => {
        const author = new AuthorCommandModule();
        const args  = {
            _: ["author"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
                "../public/logo192.png",
                "../public/favicon260.png",
                "../public/android-chrome-192x192.png",
                "../public/mstile-150x150.png"]
        } as Arguments<{}>;


        expect(author.command).toBe("author");
        author.handler(args);
        expect(author.handlerResult.command).toBe("author");
        expect(mockConsole).toHaveBeenCalledTimes(1);
        expect(mockConsole).toHaveBeenCalledWith(`
Joe Hall has been a professional software developer for more than 30 years.

He worked as a programmer for Microsoft and IBM and he was the software 
architect for a Fortune 500 bank. He was the CTO of a ticket sales and 
servicing company and he started his own consulting company in 2006.

Joe makes his living writing desktop, web, and mobile device applications 
for businesses and governmental agencies, but game programming is his 
passion, and it was gaming that got him into programming in the first place.

He was a member of the original Xbox team and he joined the Visual Studio 
.NET team just after the Xbox was released in 2001. Joe is the author of XNA 
Game Studio Express: Developing Games for Windows and the Xbox 360, which was 
published in 2007.

Joe also dabbles in sketching, cartooning, and creating 3D models. When you 
see his artistic creations, you'll understand why he makes his living as a 
programmer.
`);
    });

});
