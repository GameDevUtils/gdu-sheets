import fs from 'fs';
import path from 'path';
import { getPixels, savePixels } from 'ndarray-pixels';

export default class SliceLogic {
    public static async Slice(filename: string, numcols: number, rows: string[]) : Promise<void> {
        // // this is the web logic
        // const inBytes = await fetch(filename)
        //     .then((res) => res.arrayBuffer())
        //     .then((arrayBuffer) => new Uint8Array(arrayBuffer));
        // const pixels = await getPixels(inBytes, 'image/png');

        // // this is the nodejs logic
        const inBuffer = fs.readFileSync(filename); // Uint8Array
        const pixels = await getPixels(inBuffer, 'image/png'); // ndArray

        const spriteWidth = Math.floor(pixels.shape[0] / numcols);
        const spriteHeight = Math.floor(pixels.shape[1] / rows.length);
        // const pixelSize = pixels.shape[2]; // 4 ??
        const spritePrefix = path.parse(filename).name;
        const spritePath = path.parse(filename).dir;

        for(let y = 0; y < rows.length; y++) {
            const previousRowName = rows[y];
            for(let x = 0; x < numcols; x++) {
                const pixelSubset = await pixels
                    .hi(x * spriteWidth + spriteWidth, y * spriteHeight + spriteHeight)
                    .lo(x * spriteWidth, y * spriteHeight);
                // const spriteFilename = `${spritePath}/_sprites/${spritePrefix}-${rows[y]}-${x + previousColIndex}.png`;
                const spriteFilename = `${spritePath}/_sprites/${spritePrefix}-${rows[y]}-${x}.png`;
                if(!fs.existsSync(`${spritePath}/_sprites/`)) {
                    fs.mkdirSync(`${spritePath}/_sprites/`);
                }

                // // this is the web logic
                // const outBytes = await savePixels(pixels, 'image/png'); // Uint8Array

                // // this is the nodejs logic
                const outBuffer = await savePixels(pixelSubset, 'image/png'); // Uint8Array
                fs.writeFileSync(spriteFilename, outBuffer);
            }
        }

        // // this is the web logic
        // const outBytes = await savePixels(pixels, 'image/png');

        // // this is the nodejs logic
        const outBuffer = await savePixels(pixels, 'image/png'); // Uint8Array
        fs.writeFileSync('./output.png', outBuffer);
    }
}