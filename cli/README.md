# Sheets

Sheets is one of the apps in the http://gamedevutils.com/ suite of tools. It takes a collection of images and efficiently packs them into a single texture (sprite sheet), along with a mapping file (sprite atlas).

![Screenshot of the Sheets web application](../_assets/the-web-application-1.png)

## The CLI App

The cli folder contains the logic for the command-line app.

### Build

Run the following from the `cli` folder to build the app.

```shell script
npm run build
```

### Test

Run the following from the `cli` folder to run the tests for the app.

```shell script
npm run watch-all
```

### Run

Run the following from the `cli` folder to execute the app, showing how to use the new command.

```shell script
node ./build/sheets help new
```

### Run Options

Run the following from the `cli` folder to execute the app, showing all of the command-line options.

```shell script
node ./build/sheets help --show-hidden
```

That command produces the following output.

```shell script
sheets <cmd> [args]

Commands:
  sheets new <path> [images..]     create a new project
  sheets edit <path> [images..]    modify a project
  sheets add <path> <images..>     add image(s) to project
  sheets remove <path> [images..]  remove image(s) from project
  sheets publish <path> [outpath]  generate game assets
  sheets developer                 about the developer
  sheets license                   display license text
  sheets libs                      open source dependency list
  sheets help <module>             display help text

Output
  -n, --name           the project name           [string] [default: "Untitled"]
  -i, --image-format   image format of sprite sheet
                                  [string] [choices: "PNG", "GIF", "JPG", "BMP"]
  -d, --data-format    data format for sprite sheet
                                        [string] [choices: "CSS", "JSON", "XML"]
  -e, --name-in-sheet  retain extension in sprite name
                           [string] [choices: "KeepExtension", "StripExtension"]

Algorithm
  -p, --sprite-packer  sprite packing algorithm
                                         [string] [choices: "JoeRects", "Basic"]
  -z, --sort-by        sprite sort mode
        [string] [choices: "AREA", "AREA_DESC", "HEIGHT", "HEIGHT_DESC", "NAME",
        "NAME_DESC", "PATH", "PATH_DESC", "WIDTH", "WIDTH_DESC", "SHORTER_SIDE",
            "SHORTER_SIDE_DESC", "LONGER_SIDE", "LONGER_SIDE_DESC", "PERIMETER",
                  "PERIMETER_DESC", "SIDE_DIFF", "SIDE_DIFF_DESC", "SIDE_RATIO",
                                                              "SIDE_RATIO_DESC"]
  -r, --allow-rotate   allow sprite rotation                           [boolean]

Dimensions
  -w, --width         width of the sprite sheet                         [number]
  -h, --height        height of the sprite sheet                        [number]
  -m, --size-mode     size is max or actual
                                      [string] [choices: "MaxSize", "FixedSize"]
  -c, --constraint    constrain size to powers of 2
                                     [string] [choices: "AnySize", "PowerOfTwo"]
  -s, --force-square  width must equal height                          [boolean]
  -x, --include-2x    produce sprites at 2 scales                      [boolean]

Padding
  -B, --border-padding  border padding in pixels                        [number]
  -S, --shape-padding   shape padding in pixels                         [number]
  -I, --inner-padding   inner padding in pixels                         [number]

Filters
  -A, --clean-alpha     transparent pixels, same value                 [boolean]
  -M, --color-mask      top, left pixel is mask color                  [boolean]
  -L, --alias-sprites   identify duplicate sprites                     [boolean]
  -D, --debug-mode      identify duplicate sprites                     [boolean]
  -t, --trim-mode       trim transparent pixels
                                              [string] [choices: "None", "Trim"]
  -T, --trim-threshold  sensitivity to transparency                     [number]

Advanced
  -g, --animated-gif      extract animation frames
                            [string] [choices: "UseFirstFrame", "ExtractFrames"]
  -C, --compress-project  zip project file                             [boolean]

CLI-Only
  -o, --console              output to console        [boolean] [default: false]
  -O, --overwrite            overwrite existing file, if any
                                                      [boolean] [default: false]
  -l, --log-level            set logging level, default: WARN
   [string] [choices: "DEBUG", "INFO", "LOG", "WARN", "ERROR"] [default: "WARN"]
  -f, --remove-by-filename   remove images by filename only
                                                      [boolean] [default: false]
  -F, --remove-by-full-path  remove images by full path[boolean] [default: true]

Options:
      --help         Show help                                         [boolean]
      --show-hidden  Show hidden options                               [boolean]
      --version      Show version number                               [boolean]
```
