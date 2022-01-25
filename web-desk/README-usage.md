# [GameDevUtils.com](http://gamedevutils.com/) Sheets

Sheets is a tool that's used to merge several art assets (representing objects within the game) into a single image, saving memory and reducing CPU-to-GPU chatter.

## Project File Structure

Project data is saved to disk as a JSON file. The JSON data is split into two parts: Settings and Resources (images).

A project file can be generated using command line options of the `CLI` application, optionally augmented with a `sheets.json` file. ??? Within the `Desktop` and `Web` applications, project files are created and modified using the UI.

### Editing Settings

Settings include every option available for manipulating and placing images into the sprite sheet and atlas.

For the `CLI` application, settings are configured via an optional `sheets.json` file and those values can be overridden using command line options.

For the `Desktop` and `Web` applications, options are configured via their UIs.

### Managing Resources

Resources are the individual sprite images to be stitched into a single image sheet. Sprite images are stored in the project file (as BASE-64 blobs) when saved so that everything is self-contained when sharing projects.

For the `Desktop` and `Web` applications, resources are managed via their UIs.

For the `CLI` application, two modes of operation are supported.

1. A complete project file can be referenced on the command line. Everything needed (settings and resources) is included in that single file. The project file format is shared between the various application types (`CLI`, `Web`, and `Desktop`), so you should be able to use a given project on any platform.
1. Resources within a specified project file can be modified using command line options.

|Feature|Web|App|CLI|
|-------|:---:|:---:|:---:|
|Create Project|☑|☑|☑|
|Modify Project|☑|☑|☑|
|Publish Project|☑|☑|☑|
|Script Actions|☐|☐|☑|