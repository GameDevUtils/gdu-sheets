---
layout: document
title: Documentation
---

# File Formats

There are a lot of file formats available to the game developer and artist. This rewrite of the initial GameDevUtils.com release doesn't include support for more image or data formats. Those will be included in a future release. The goal of the current release is to have a 1-to-1 feature parity between the initial release (v0.2.0) and the rewrite of same (v0.3.0).

If you have a particular file format that you would like to see supported, [open an issue](https://github.com/GameDevUtils/gdu-sheets/issues/new?title=Feature%20Request%20(File%20Formats)&body=I%20would%20like%20to%20see%20support%20for%20the%20following%20file%20format(s):) in GitHub. 

### Image Format

The following image formats are supported by this module:

- GIF
- JPG
- PNG (default)

GameDevUtils.com started as a web-only application, so it only used web-friendly image formats. An upcoming release will include support for more image formats. Where applicable, this module will also support setting the image quality on generated images.

### Data Format

The following data formats are supported by this module:

- CSS
- JSON
- XML (default)

An upcoming release will include support for Game engine-specific data formats.

### Project Files (Save Action)

There are two variants of the project file format:

- FPSHEETS (default)<br/>
  Project file as JSON.
- FPSHEETZ<br/> 
  Project file as JSON, compressed.

Project files contain all the settings data for the project, as well as the base64-encoded source images.

### Output File (Publish Action)

When the project is published, the result is a ZIP file containing the imgage file (with the sprites) and the data file (with the sprite locations and sizes). 

This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. 

<div class="row docs-nav">
<div class="col-2"></div>
<div class="col-4"><button type="button" onclick='javascript:goto(this, "03-project-settings.html");' class="btn btn-primary">&laquo; Previous</button></div>
<div class="col-4"><button type="button" onclick='javascript:goto();' class="btn btn-primary disabled">Next &raquo;</button></div>
<div class="col-2"></div>
</div>
