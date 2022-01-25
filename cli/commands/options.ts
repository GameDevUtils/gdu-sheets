import { AppConstants, V_LATEST, ImageFormat, DataFormat,
         SpriteNameInAtlas, SpritePacker, SortBy,
         /*YesNo,*/ SizeMode, Constraint, TrimMode, AnimatedGif } from 'gdu-core';
// import ExtCommandModule from './helpers/ExtCommandModule';
import yargs, {Argv} from  'yargs';

// n i d e p z r w h m c s x B S I A M L D t T g C
// o

class Alias {
    constructor(init?: { key?: string, alias1?: string, alias2?: string, group?: string, default?: string, describe?: string, type?: string, hidden: boolean, choices?: string[] }) {
        if(init) {
            this.key = init.key ?? undefined;
            this.alias1 = init.alias1 ?? undefined;
            this.alias2 = init.alias2 ?? undefined;
            this.group = init.group ?? undefined;
            this.default = init.default ?? undefined;
            this.describe = init.describe ?? undefined;
            this.type = init.type ?? undefined;
            this.hidden = init.hidden ?? undefined;
            this.choices = init.choices ?? undefined;
        } else {
            this.key = undefined;
            this.alias1 = undefined;
            this.alias2 = undefined;
            this.group = undefined;
            this.default = undefined;
            this.describe = undefined;
            this.type = undefined;
            this.hidden = undefined;
            this.choices = undefined;
        }
    }

    key: string | undefined = undefined;
    alias1: string | undefined = undefined;
    alias2: string | undefined = undefined;
    group: string | undefined = undefined;
    default: string | undefined = undefined;
    describe: string | undefined = undefined;
    type: string | undefined = undefined;
    hidden: boolean | undefined = undefined;
    choices: string[] | undefined = undefined;
}

export default class Options {
    static PopulateOptions : (argv: yargs.Argv<{}>) => Alias[] = (argv: Argv) => {
        const aliases : Alias[] = [];
        const defaults = Object.assign({}, AppConstants.DEFAULT_OPTIONS[V_LATEST]);

        aliases.push(new Alias({
            "key": "n", "alias1": "name", "alias2": "name",
            "group": "Output", "default": defaults["name"] ?? "Untitled",
            "describe": "the project name",
            "type": "string", "hidden": true,
            // "choices": ["a", "b", "c", "d", "e"]
        }));

        aliases.push(new Alias({
            "key": "i", "alias1": "image-format", "alias2": "imageFormat",
            "group": "Output", "default": ImageFormat[defaults['imageFormat']] ?? ImageFormat[ImageFormat.PNG],
            "describe": "image format of sprite sheet",
            "type": "string", "hidden": true,
            "choices": [ ImageFormat[ImageFormat.GIF], ImageFormat[ImageFormat.JPG], ImageFormat[ImageFormat.PNG] ],
        }));

        aliases.push(new Alias({
            "key": "d", "alias1": "data-format", "alias2": "dataFormat",
            "group": "Output", "default": DataFormat[defaults['dataFormat']] ?? DataFormat[DataFormat.XML],
            "describe": "data format for sprite sheet",
            "type": "string", "hidden": true,
            "choices": [ DataFormat[DataFormat.CSS], DataFormat[DataFormat.JSON], DataFormat[DataFormat.XML] ]
        }));

        aliases.push(new Alias({
            "key": "e", "alias1": "name-in-sheet", "alias2": "nameInSheet",
            "group": "Output", "default": SpriteNameInAtlas[defaults['nameInSheet']] ?? SpriteNameInAtlas[SpriteNameInAtlas.StripExtension],
            "describe": "retain extension in sprite name",
            "type": "string", "hidden": true,
            "choices": [ SpriteNameInAtlas[SpriteNameInAtlas.KeepExtension], SpriteNameInAtlas[SpriteNameInAtlas.StripExtension] ]
        }));

        return aliases;
    };

    static AppendOptions : (argv: yargs.Argv<{}>) => yargs.Argv<{}> | undefined = (argv: Argv) => {
        if(argv && argv.option) {
            const defaults = Object.assign({}, AppConstants.DEFAULT_OPTIONS[V_LATEST]);

            argv.option('n', {
                alias: 'name',
                group: 'Output',
                default: defaults['name'] ?? 'Untitled',
                describe: 'the project name',
                type: 'string',
                hidden: true,
            });

            argv.option('i', {
                alias: 'image-format',
                group: 'Output',
                default: ImageFormat[defaults['imageFormat']] ?? ImageFormat[ImageFormat.PNG],
                describe: 'image format of sprite sheet',
                choices: [ ImageFormat[ImageFormat.GIF], ImageFormat[ImageFormat.JPG], ImageFormat[ImageFormat.PNG] ],
                hidden: true,
            });

            argv.option('d', {
                alias: 'data-format',
                group: 'Output',
                default: DataFormat[defaults['dataFormat']] ?? DataFormat[DataFormat.XML],
                describe: 'data format for sprite sheet',
                choices: [ DataFormat[DataFormat.CSS], DataFormat[DataFormat.JSON], DataFormat[DataFormat.XML] ],
                hidden: true,
            });

            argv.option('e', {
                alias: 'keep-extension',
                group: 'Output',
                default: SpriteNameInAtlas[defaults['nameInSheet']] ?? SpriteNameInAtlas[SpriteNameInAtlas.StripExtension],
                describe: 'retain extension in sprite name',
                choices: [ SpriteNameInAtlas[SpriteNameInAtlas.KeepExtension], SpriteNameInAtlas[SpriteNameInAtlas.StripExtension] ],
                hidden: true,
            });

            argv.option('p', {
                alias: 'sprite-packer',
                group: 'Algorithm',
                default: SpritePacker[defaults['spritePacker']] ?? SpritePacker[SpritePacker.Basic],
                describe: 'sprite packing algorithm',
                choices: [ SpritePacker[SpritePacker.Basic], SpritePacker[SpritePacker.JoeRects] ],
                hidden: true,
            });

            argv.option('z', {
                alias: 'sort-by',
                group: 'Algorithm',
                default: SortBy[defaults['sortBy']] ?? SortBy[SortBy.AREA_DESC],
                describe: 'sprite sort mode',
                choices: [ SortBy[SortBy.AREA], SortBy[SortBy.AREA_DESC], SortBy[SortBy.HEIGHT], SortBy[SortBy.HEIGHT_DESC], SortBy[SortBy.NAME], SortBy[SortBy.NAME_DESC], SortBy[SortBy.WIDTH], SortBy[SortBy.WIDTH_DESC] ],
                hidden: true,
            });

            argv.option('r', {
                alias: 'allow-rotate',
                group: 'Algorithm',
                // default: YesNo[defaults['allowRotate']] || YesNo[YesNo.NO],
                default: false,
                describe: 'allow sprite rotation',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('w', {
                alias: 'width',
                group: 'Dimensions',
                default: defaults['width'] ?? 1024,
                describe: 'width of the sprite sheet',
                type: 'number',
                hidden: true,
            });

            argv.option('h', {
                alias: 'height',
                group: 'Dimensions',
                default: defaults['height'] ?? 1024,
                describe: 'height of the sprite sheet',
                type: 'number',
                hidden: true,
            });

            argv.option('m', {
                alias: 'size-mode',
                group: 'Dimensions',
                default: SizeMode[defaults['sizeMode']] ?? SizeMode[SizeMode.MaxSize],
                describe: 'size is max or actual',
                choices: [ SizeMode[SizeMode.FixedSize], SizeMode[SizeMode.MaxSize] ],
                hidden: true,
            });

            argv.option('c', {
                alias: 'constraint',
                group: 'Dimensions',
                default: Constraint[defaults['constraint']] ?? Constraint[Constraint.PowerOfTwo],
                describe: 'constrain size to powers of 2',
                choices: [ Constraint[Constraint.AnySize], Constraint[Constraint.PowerOfTwo] ],
                hidden: true,
            });

            argv.option('s', {
                alias: 'force-square',
                group: 'Dimensions',
                // default: YesNo[defaults['forceSquare']] || YesNo[YesNo.NO],
                default: false,
                describe: 'width must equal height',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('x', {
                // alias: 'include-at-2x',
                alias: 'include-2x',
                group: 'Dimensions',
                // default: YesNo[defaults['includeAt2x']] || YesNo[YesNo.NO],
                default: false,
                describe: 'produce sprites at 2 scales',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('B', {
                alias: 'border-padding',
                group: 'Padding',
                default: defaults['borderPadding'] ?? 2,
                describe: 'border padding in pixels',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'number',
                hidden: true,
            });

            argv.option('S', {
                alias: 'shape-padding',
                group: 'Padding',
                default: defaults['shapePadding'] ?? 2,
                describe: 'shape padding in pixels',
                type: 'number',
                hidden: true,
            });

            argv.option('I', {
                alias: 'inner-padding',
                group: 'Padding',
                default: defaults['innerPadding'] ?? 0,
                describe: 'inner padding in pixels',
                type: 'number',
                hidden: true,
            });

            argv.option('A', {
                alias: 'clean-alpha',
                group: 'Filters',
                // default: YesNo[defaults['cleanAlpha']] || YesNo[YesNo.NO],
                default: false,
                describe: 'transparent pixels, same value',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('M', {
                alias: 'color-mask',
                group: 'Filters',
                // default: YesNo[defaults['colorMask']] || YesNo[YesNo.NO],
                default: false,
                describe: 'top, left pixel is mask color',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('L', {
                alias: 'alias-sprites',
                group: 'Filters',
                // default: YesNo[defaults['aliasSprites']] || YesNo[YesNo.NO],
                default: false,
                describe: 'identify duplicate sprites',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('D', {
                alias: 'debug-mode',
                group: 'Filters',
                // default: YesNo[defaults['debugMode']] || YesNo[YesNo.NO],
                default: false,
                describe: 'highlight sprite bounds',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('t', {
                alias: 'trim-mode',
                group: 'Filters',
                default: TrimMode[defaults['trimMode']] ?? TrimMode[TrimMode.None],
                describe: 'trim transparent pixels',
                choices: [ TrimMode[TrimMode.None], TrimMode[TrimMode.Trim] ],
                hidden: true,
            });

            argv.option('T', {
                alias: 'trim-threshold',
                group: 'Filters',
                default: defaults['trimThreshold'] ?? 0,
                describe: 'sensitivity to transparency',
                type: 'number',
                hidden: true,
            });

            argv.option('g', {
                alias: 'animated-gif',
                group: 'Advanced',
                default: AnimatedGif[defaults['animatedGif']] ?? AnimatedGif[AnimatedGif.UseFirstFrame],
                describe: 'extract animation frames',
                choices: [ AnimatedGif[AnimatedGif.ExtractFrames], AnimatedGif[AnimatedGif.UseFirstFrame] ],
                hidden: true,
            });

            argv.option('C', {
                alias: 'compress-project',
                group: 'Advanced',
                // default: YesNo[defaults['compressProject']] || YesNo[YesNo.NO],
                default: false,
                describe: 'zip project file',
                // choices: [ YesNo[YesNo.NO], YesNo[YesNo.YES] ],
                type: 'boolean',
                hidden: true,
            });

            argv.option('o', {
                alias: 'output',
                // group: 'Advanced',
                // default: false,
                describe: 'write output to console',
                type: 'boolean'
            });

            argv.showHidden(true);

            // argv.showHidden();

            // argv.coerce({});
// console.log(JSON.stringify(argv));
            return argv;
        }
    }
}

// let x = {
//     implies: ['x', 'x', 'x'] || 'y',
//     conflicts: ['x', 'x', 'x'] || 'y',
//     hidden: true,
//     demandOption: true || "error message",
//     defaultDescription: "description",
//
//     config: "boolean" + ("option is path to JSON file"),
// }
