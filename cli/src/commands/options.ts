import yargs, {Argv} from  'yargs';
import {
    AnimatedGif,
    Constraint,
    DataFormat,
    ImageFormat,
    OptionGroup,
    OptionName,
    SizeMode,
    SortBy, SpriteNameInAtlas, SpritePacker, TrimMode
} from "gdu-common/build/objs/projects";
import StringUtil from "gdu-common/build/utils/StringUtil";
import {MESSAGE_TYPE} from "gdu-common/build/objs/messages";

// n i d e p z r w h m c s x B S I A M L D t T g C
// o O l f F

class OptionValues {
    constructor(init?: { alias1?: string, alias2?: string, group?: string, default?: string | number | boolean, describe?: string, type?: string, hidden: boolean, choices?: string[] }) {
        if(init) {
            this.alias1 = init.alias1 ?? '';
            this.alias2 = init.alias2 ?? undefined;
            this.group = init.group ?? undefined;
            this.default = init.default ?? undefined;
            this.describe = init.describe ?? undefined;
            this.type = init.type ?? undefined;
            this.hidden = init.hidden ?? undefined;
            this.choices = init.choices ?? undefined;
        } else {
            this.alias1 = '';
            this.alias2 = undefined;
            this.group = undefined;
            this.default = undefined;
            this.describe = undefined;
            this.type = undefined;
            this.hidden = undefined;
            this.choices = undefined;
        }
    }

    alias1: string = '';
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
        optionValues.alias1 = StringUtil.toKebabCase(OptionName[name]);
        optionValues.alias2 = alias2;
        optionValues.hidden = hidden;

        return optionValues;
    }

    static getEnumNames = (e : any): string[] => {
        const result: string[] = [];

        for(const item in e) {
            if(isNaN(parseInt(item))) {
                result.push(item);
            }
        }

        return result;
    };

    static AppendOptions : (argv: yargs.Argv<{}>) => yargs.Argv<{}> = (argv: Argv) => {
        let option: OptionValues;
        option = Options.makeOption(
            OptionName.Name,
            OptionGroup.Output,
            'the project name',
            'string',
            'Untitled',
        );
        argv.option('n', option as Options);
        argv.alias('n', option.alias1);

        option = Options.makeOption(
            OptionName.ImageFormat,
            OptionGroup.Output,
            'image format of sprite sheet',
            'string',
            undefined, // ImageFormat[ImageFormat.PNG],
            Options.getEnumNames(ImageFormat),
        );
        argv.option('i', option as Options);
        argv.alias('i', option.alias1);

        option = Options.makeOption(
            OptionName.DataFormat,
            OptionGroup.Output,
            'data format for sprite sheet',
            'string',
            undefined, // DataFormat[DataFormat.XML],
            Options.getEnumNames(DataFormat),
        );
        argv.option('d', option as Options);
        argv.alias('d', option.alias1);

        option = Options.makeOption(
            OptionName.NameInSheet,
            OptionGroup.Output,
            'retain extension in sprite name',
            'string',
            undefined, // SpriteNameInAtlas[SpriteNameInAtlas.StripExtension],
            Options.getEnumNames(SpriteNameInAtlas),
        );
        argv.option('e', option as Options);
        argv.alias('e', option.alias1);

        option = Options.makeOption(
            OptionName.SpritePacker,
            OptionGroup.Algorithm,
            'sprite packing algorithm',
            'string',
            undefined, // SpritePacker[SpritePacker.JoeRects],
            Options.getEnumNames(SpritePacker),
        );
        argv.option('p', option as Options);
        argv.alias('p', option.alias1);

        option = Options.makeOption(
            OptionName.SortBy,
            OptionGroup.Algorithm,
            'sprite sort mode',
            'string',
            undefined, // SortBy[SortBy.AREA_DESC],
            Options.getEnumNames(SortBy),
        );
        argv.option('z', option as Options);
        argv.alias('z', option.alias1);

        option = Options.makeOption(
            OptionName.AllowRotate,
            OptionGroup.Algorithm,
            'allow sprite rotation',
            'boolean',
            undefined, // false,
            // Options.getEnumValues(YesNo),
        );
        argv.option('r', option as Options);
        argv.alias('r', option.alias1);

        option = Options.makeOption(
            OptionName.Width,
            OptionGroup.Dimensions,
            'width of the sprite sheet',
            'number',
            undefined, // 1024,
            // Options.getEnumValues(YesNo),
        );
        argv.option('w', option as Options);
        argv.alias('w', option.alias1);

        option = Options.makeOption(
            OptionName.Height,
            OptionGroup.Dimensions,
            'height of the sprite sheet',
            'number',
            undefined, // 1024,
            // Options.getEnumValues(YesNo),
        );
        argv.option('h', option as Options);
        argv.alias('h', option.alias1);

        option = Options.makeOption(
            OptionName.SizeMode,
            OptionGroup.Dimensions,
            'size is max or actual',
            'string',
            undefined, // SizeMode[SizeMode.MaxSize],
            Options.getEnumNames(SizeMode),
        );
        argv.option('m', option as Options);
        argv.alias('m', option.alias1);

        option = Options.makeOption(
            OptionName.Constraint,
            OptionGroup.Dimensions,
            'constrain size to powers of 2',
            'string',
            undefined, // Constraint[Constraint.PowerOfTwo],
            Options.getEnumNames(Constraint),
        );
        argv.option('c', option as Options);
        argv.alias('c', option.alias1);

        option = Options.makeOption(
            OptionName.ForceSquare,
            OptionGroup.Dimensions,
            'width must equal height',
            'boolean',
            undefined, // false, // in v0.1.0 this was false
            // Options.getEnumValues(YesNo),
        );
        argv.option('s', option as Options);
        argv.alias('s', option.alias1);

        option = Options.makeOption(
            OptionName.Include2x,
            OptionGroup.Dimensions,
            'produce sprites at 2 scales',
            'boolean',
            undefined, // false,
            // Options.getEnumValues(YesNo),
        );
        argv.option('x', option as Options);
        argv.alias('x', option.alias1);

        option = Options.makeOption(
            OptionName.BorderPadding,
            OptionGroup.Padding,
            'border padding in pixels',
            'number',
            undefined, // 2,
            // Options.getEnumValues(YesNo),
        );
        argv.option('B', option as Options);
        argv.alias('B', option.alias1);

        option = Options.makeOption(
            OptionName.ShapePadding,
            OptionGroup.Padding,
            'shape padding in pixels',
            'number',
            undefined, // 2,
            // Options.getEnumValues(YesNo),
        );
        argv.option('S', option as Options);
        argv.alias('S', option.alias1);

        option = Options.makeOption(
            OptionName.InnerPadding,
            OptionGroup.Padding,
            'inner padding in pixels',
            'number',
            undefined, // 0,
            // Options.getEnumValues(YesNo),
        );
        argv.option('I', option as Options);
        argv.alias('I', option.alias1);

        option = Options.makeOption(
            OptionName.CleanAlpha,
            OptionGroup.Filters,
            'transparent pixels, same value',
            'boolean',
            undefined, // false,
            // Options.getEnumValues(YesNo),
        );
        argv.option('A', option as Options);
        argv.alias('A', option.alias1);

        option = Options.makeOption(
            OptionName.ColorMask,
            OptionGroup.Filters,
            'top, left pixel is mask color',
            'boolean',
            undefined, // false,
            // Options.getEnumValues(YesNo),
        );
        argv.option('M', option as Options);
        argv.alias('M', option.alias1);

        option = Options.makeOption(
            OptionName.AliasSprites,
            OptionGroup.Filters,
            'identify duplicate sprites',
            'boolean',
            undefined, // false,
            // Options.getEnumValues(YesNo),
        );
        argv.option('L', option as Options);
        argv.alias('L', option.alias1);

        option = Options.makeOption(
            OptionName.DebugMode,
            OptionGroup.Filters,
            'identify duplicate sprites',
            'boolean',
            undefined, // false,
            // Options.getEnumValues(YesNo),
        );
        argv.option('D', option as Options);
        argv.alias('D', option.alias1);

        option = Options.makeOption(
            OptionName.TrimMode,
            OptionGroup.Filters,
            'trim transparent pixels',
            'string',
            undefined, // TrimMode[TrimMode.None],
            Options.getEnumNames(TrimMode),
        );
        argv.option('t', option as Options);
        argv.alias('t', option.alias1);

        option = Options.makeOption(
            OptionName.TrimThreshold,
            OptionGroup.Filters,
            'sensitivity to transparency',
            'number',
            undefined, // 1,
        );
        argv.option('T', option as Options);
        argv.alias('T', option.alias1);

        option = Options.makeOption(
            OptionName.AnimatedGif,
            OptionGroup.Advanced,
            'extract animation frames',
            'string',
            undefined, // AnimatedGif[AnimatedGif.UseFirstFrame],
            Options.getEnumNames(AnimatedGif),
        );
        argv.option('g', option as Options);
        argv.alias('g', option.alias1);

        option = Options.makeOption(
            OptionName.CompressProject,
            OptionGroup.Advanced,
            'zip project file',
            'boolean',
            undefined, // false,
        );
        argv.option('C', option as Options);
        argv.alias('C', option.alias1);

        /// CLI-only options ...

        argv.option('o', {
            alias: 'console',
            group: 'CLI-Only',
            default: false,
            describe: 'output to console',
            type: 'boolean',
        });

        argv.option('O', {
            alias: 'overwrite',
            group: 'CLI-Only',
            default: false,
            describe: 'overwrite existing file, if any',
            type: 'boolean'
        });

        argv.option('l', {
            alias: 'log-level',
            group: 'CLI-Only',
            default: MESSAGE_TYPE[MESSAGE_TYPE.WARN],
            describe: 'set logging level, default: WARN',
            type: 'string',
            choices: Options.getEnumNames(MESSAGE_TYPE)
        });

        argv.option('f', {
            alias: 'remove-by-filename',
            group: 'CLI-Only',
            default: undefined,
            describe: 'remove images by filename only',
            type: 'boolean',
            conflicts: ['F']
        });

        argv.option('F', {
            alias: 'remove-by-full-path',
            group: 'CLI-Only',
            default: true,
            describe: 'remove images by full path',
            type: 'boolean',
            conflicts: ['f']
        });

        argv.showHidden(true);

        return argv;
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
