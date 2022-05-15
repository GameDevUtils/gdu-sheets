import {
    AppConstants, V_LATEST, ImageFormat, DataFormat,
    SpriteNameInAtlas, SpritePacker, SortBy,
    /*YesNo,*/ SizeMode, Constraint, TrimMode, AnimatedGif,
    OptionGroup, /*ProjectOptions, Project,*/ OptionName,
    /*camelCase,*/ kabobCase
} from 'gdu-common';
import yargs, {Argv} from  'yargs';

// n i d e p z r w h m c s x B S I A M L D t T g C
// o

class OptionValues {
    constructor(init?: { alias1?: string, alias2?: string, group?: string, default?: string | number | boolean, describe?: string, type?: string, hidden: boolean, choices?: string[] }) {
        if(init) {
            this.alias1 = init.alias1 ?? undefined;
            this.alias2 = init.alias2 ?? undefined;
            this.group = init.group ?? undefined;
            this.default = init.default ?? undefined;
            this.describe = init.describe ?? undefined;
            this.type = init.type ?? undefined;
            this.hidden = init.hidden ?? undefined;
            this.choices = init.choices ?? undefined;
        } else {
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

    alias1: string | undefined = undefined;
    alias2: string | undefined = undefined;
    group: string | undefined = undefined;
    default: string | number | boolean | undefined = undefined;
    describe: string | undefined = undefined;
    type: string | undefined = undefined;
    hidden: boolean | undefined = undefined;
    choices: string[] | undefined = undefined;
}

export default class Options {

    static makeOption = (name: OptionName, group: OptionGroup, describe: string, type: string, defaultValue?: string | number | boolean, choices?: string[], alias2?: string, hidden = true) : OptionValues => {
        const optionValues = new OptionValues();

        optionValues.group = OptionGroup[group];
        optionValues.describe = describe;
        optionValues.type = type;
        optionValues.default = defaultValue;
        optionValues.choices = choices;
        optionValues.alias1 = kabobCase(OptionName[name]);
        optionValues.alias2 = alias2;
        optionValues.hidden = hidden;

        return optionValues;
    }

    // static PopulateOptions : (argv: yargs.Argv<{}>) => Alias[] = (argv: Argv) => {
    //     const aliases : Alias[] = [];
    //     const defaults = Object.assign({}, AppConstants.DEFAULT_OPTIONS[V_LATEST]);
    //
    //     aliases.push(new Alias({
    //         "key": "n", "alias1": "name", "alias2": "name",
    //         "group": "Output", "default": defaults["name"] ?? "Untitled",
    //         "describe": "the project name",
    //         "type": "string", "hidden": true,
    //         // "choices": ["a", "b", "c", "d", "e"]
    //     }));
    //
    //     aliases.push(new Alias({
    //         "key": "i", "alias1": "image-format", "alias2": "imageFormat",
    //         "group": "Output", "default": ImageFormat[defaults['imageFormat']] ?? ImageFormat[ImageFormat.PNG],
    //         "describe": "image format of sprite sheet",
    //         "type": "string", "hidden": true,
    //         "choices": [ ImageFormat[ImageFormat.GIF], ImageFormat[ImageFormat.JPG], ImageFormat[ImageFormat.PNG] ],
    //     }));
    //
    //     aliases.push(new Alias({
    //         "key": "d", "alias1": "data-format", "alias2": "dataFormat",
    //         "group": "Output", "default": DataFormat[defaults['dataFormat']] ?? DataFormat[DataFormat.XML],
    //         "describe": "data format for sprite sheet",
    //         "type": "string", "hidden": true,
    //         "choices": [ DataFormat[DataFormat.CSS], DataFormat[DataFormat.JSON], DataFormat[DataFormat.XML] ]
    //     }));
    //
    //     aliases.push(new Alias({
    //         "key": "e", "alias1": "name-in-sheet", "alias2": "nameInSheet",
    //         "group": "Output", "default": SpriteNameInAtlas[defaults['nameInSheet']] ?? SpriteNameInAtlas[SpriteNameInAtlas.StripExtension],
    //         "describe": "retain extension in sprite name",
    //         "type": "string", "hidden": true,
    //         "choices": [ SpriteNameInAtlas[SpriteNameInAtlas.KeepExtension], SpriteNameInAtlas[SpriteNameInAtlas.StripExtension] ]
    //     }));
    //
    //     return aliases;
    // };

    static getEnumNames = (e : any): string[] => {
        const result: string[] = [];

        for(const item in e) {
            if(isNaN(parseInt(item))) {
                result.push(item);
            }
        }

        return result;
        console.log();
    };

    // static getEnumValues = (e : any): string[] => {
    //     const result: string[] = [];
    //
    //     for(const item in e) {
    //         if(typeof parseInt(e) === 'number') {
    //             result.push(e[item]);
    //         }
    //     }
    //
    //     return result;
    // };

    static AppendOptions : (argv: yargs.Argv<{}>) => yargs.Argv<{}> | undefined = (argv: Argv) => {
        if(argv && argv.option) {
            const defaults = Object.assign({}, AppConstants.DEFAULT_OPTIONS[V_LATEST]) as Record<string, unknown>;

            let option : OptionValues;
            option = Options.makeOption(
                OptionName.Name,
                OptionGroup.Output,
                'the project name',
                'string',
                'Untitled'
            );
            argv.option('n', option as Options);

            option = Options.makeOption(
                OptionName.ImageFormat,
                OptionGroup.Output,
                'image format of sprite sheet',
                'string',
                ImageFormat[ImageFormat.PNG],
                Options.getEnumNames(ImageFormat),
            );
            argv.option('i', option as Options);

            option = Options.makeOption(
                OptionName.DataFormat,
                OptionGroup.Output,
                'data format for sprite sheet',
                'string',
                DataFormat[DataFormat.XML],
                Options.getEnumNames(DataFormat),
            );
            argv.option('d', option as Options);

            option = Options.makeOption(
                OptionName.NameInSheet,
                OptionGroup.Output,
                'retain extension in sprite name',
                'string',
                SpriteNameInAtlas[SpriteNameInAtlas.StripExtension],
                Options.getEnumNames(SpriteNameInAtlas),
            );
            argv.option('e', option as Options);

            option = Options.makeOption(
                OptionName.SpritePacker,
                OptionGroup.Algorithm,
                'sprite packing algorithm',
                'string',
                SpritePacker[SpritePacker.JoeRects],
                Options.getEnumNames(SpritePacker),
            );
            argv.option('p', option as Options);

            option = Options.makeOption(
                OptionName.SortBy,
                OptionGroup.Algorithm,
                'sprite sort mode',
                'string',
                SortBy[SortBy.AREA_DESC],
                Options.getEnumNames(SortBy),
            );
            argv.option('z', option as Options);

            option = Options.makeOption(
                OptionName.AllowRotate,
                OptionGroup.Algorithm,
                'allow sprite rotation',
                'boolean',
                false,
                // Options.getEnumValues(YesNo),
            );
            argv.option('r', option as Options);

            option = Options.makeOption(
                OptionName.Width,
                OptionGroup.Dimensions,
                'width of the sprite sheet',
                'number',
                1024,
                // Options.getEnumValues(YesNo),
            );
            argv.option('w', option as Options);

            option = Options.makeOption(
                OptionName.Height,
                OptionGroup.Dimensions,
                'height of the sprite sheet',
                'number',
                1024,
                // Options.getEnumValues(YesNo),
            );
            argv.option('h', option as Options);

            option = Options.makeOption(
                OptionName.SizeMode,
                OptionGroup.Dimensions,
                'size is max or actual',
                'string',
                SizeMode[SizeMode.MaxSize],
                Options.getEnumNames(SizeMode),
            );
            argv.option('m', option as Options);

            option = Options.makeOption(
                OptionName.Constraint,
                OptionGroup.Dimensions,
                'constrain size to powers of 2',
                'string',
                Constraint[Constraint.PowerOfTwo],
                Options.getEnumNames(Constraint),
            );
            argv.option('c', option as Options);

            option = Options.makeOption(
                OptionName.ForceSquare,
                OptionGroup.Dimensions,
                'width must equal height',
                'boolean',
                false, // in v0.1.0 this was false
                // Options.getEnumValues(YesNo),
            );
            argv.option('s', option as Options);

            option = Options.makeOption(
                OptionName.Include2x,
                OptionGroup.Dimensions,
                'produce sprites at 2 scales',
                'boolean',
                false,
                // Options.getEnumValues(YesNo),
            );
            argv.option('x', option as Options);

            option = Options.makeOption(
                OptionName.BorderPadding,
                OptionGroup.Padding,
                'border padding in pixels',
                'number',
                2,
                // Options.getEnumValues(YesNo),
            );
            argv.option('B', option as Options);

            option = Options.makeOption(
                OptionName.ShapePadding,
                OptionGroup.Padding,
                'shape padding in pixels',
                'number',
                2,
                // Options.getEnumValues(YesNo),
            );
            argv.option('S', option as Options);

            option = Options.makeOption(
                OptionName.InnerPadding,
                OptionGroup.Padding,
                'inner padding in pixels',
                'number',
                0,
                // Options.getEnumValues(YesNo),
            );
            argv.option('I', option as Options);

            option = Options.makeOption(
                OptionName.CleanAlpha,
                OptionGroup.Filters,
                'transparent pixels, same value',
                'boolean',
                false,
                // Options.getEnumValues(YesNo),
            );
            argv.option('A', option as Options);

            option = Options.makeOption(
                OptionName.ColorMask,
                OptionGroup.Filters,
                'top, left pixel is mask color',
                'boolean',
                false,
                // Options.getEnumValues(YesNo),
            );
            argv.option('M', option as Options);

            option = Options.makeOption(
                OptionName.AliasSprites,
                OptionGroup.Filters,
                'identify duplicate sprites',
                'boolean',
                false,
                // Options.getEnumValues(YesNo),
            );
            argv.option('L', option as Options);

            option = Options.makeOption(
                OptionName.DebugMode,
                OptionGroup.Filters,
                'identify duplicate sprites',
                'boolean',
                false,
                // Options.getEnumValues(YesNo),
            );
            argv.option('D', option as Options);

            option = Options.makeOption(
                OptionName.TrimMode,
                OptionGroup.Filters,
                'trim transparent pixels',
                'string',
                TrimMode[TrimMode.None],
                Options.getEnumNames(TrimMode),
            );
            argv.option('t', option as Options);

            option = Options.makeOption(
                OptionName.TrimThreshold,
                OptionGroup.Filters,
                'sensitivity to transparency',
                'number',
                0,
                // Options.getEnumValues(TrimMode),
            );
            argv.option('T', option as Options);

            option = Options.makeOption(
                OptionName.AnimatedGif,
                OptionGroup.Advanced,
                'extract animation frames',
                'string',
                AnimatedGif[AnimatedGif.UseFirstFrame],
                Options.getEnumNames(AnimatedGif),
            );
            argv.option('g', option as Options);

            option = Options.makeOption(
                OptionName.CompressProject,
                OptionGroup.Advanced,
                'zip project file',
                'boolean',
                false,
                // Options.getEnumValues(AnimatedGif),
            );
            argv.option('C', option as Options);

            /// CLI-only options ...

            argv.option('o', {
                alias: 'output-to-console',
                group: 'Advanced',
                default: false,
                describe: 'write to console',
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
