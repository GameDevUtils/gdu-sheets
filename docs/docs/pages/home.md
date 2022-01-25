---
layout: page
title: Welcome to GameDevUtils.com
permalink: /
---

GameDevUtils.com is a suite of tools that I developed for my game programming students. There are certainly better products out there, but I wanted my students to have access to free tools and, more importantly, access to the source code for those tools. I also didn’t want the tools to look like poop that was designed in the 80’s.

There's only one completed module after two public releases. The name of this project is GameDevUtils, not GameDevUtil, though. The ultimate goal is to provide web, desktop, and console versions of all the planned modules.

<div class="row" style="margin-top:40px;">
    <div class="col-1">&nbsp;</div>
    <div class="col-2 text-center">
        <img style="width:100%;" src="./images/iconSpriteSheets.png" /><br/>
        <span><a href="#" title="See the features.">Look</a> | <a href="#" title="See the documentation.">Learn</a> | <a href="#" title="Use the application.">Use</a></span>
    </div>
    <div class="col-6">
        <strong>Sprite Sheets</strong> is a tool to merge several art assets (objects within the game) into a single image, saving memory and reducing CPU-to-GPU chatter.
    </div>
    <div class="col-3">&nbsp;</div>
</div>

<div class="row" style="margin-top:20px;">
    <div class="col-1">&nbsp;</div>
    <div class="col-2 text-center">
        <img style="width:100%;" src="./images/iconSpriteFonts.png" /><br/>
        <span><a href="#" title="See the features.">Look</a> | <a href="#" title="See the documentation.">Learn</a> | <a href="#" title="Use the application.">Use</a></span>
    </div>
    <div class="col-6">
        <strong>Sprite Fonts</strong> is a tool to convert public domain TTF and OTF fonts into bitmap fonts&mdash;a format that is more easily consumed by game engines.
    </div>
    <div class="col-3">&nbsp;</div>
</div>

<div class="row" style="margin-top:20px;">
    <div class="col-1">&nbsp;</div>
    <div class="col-2 text-center">
        <img style="width:100%;" src="./images/iconTileEditor.png" />
        <span><a href="#" title="See the features.">Look</a> | <a href="#" title="See the documentation.">Learn</a> | <a href="#" title="Use the application.">Use</a></span>
    </div>
    <div class="col-6">
        <strong>Tile Editor</strong> is a tool that manages the placement of a fixed set of tiled images. By painting these tiles into place, entire game worlds can be made.
    </div>
    <div class="col-3">&nbsp;</div>
</div>

<div class="row" style="margin-top:20px;">
    <div class="col-1">&nbsp;</div>
    <div class="col-2 text-center">
        <img style="width:100%;" src="./images/iconAnimation.png" />
        <span><a href="#" title="See the features.">Look</a> | <a href="#" title="See the documentation.">Learn</a> | <a href="#" title="Use the application.">Use</a></span>
    </div>
    <div class="col-6">
        <strong>Animation</strong> is a tool to assemble sprites into frame-based or bones-based animation sequences.  Future version to include UV deformation.
    </div>
    <div class="col-3">&nbsp;</div>
</div>

<div class="row" style="margin-top:20px; margin-bottom:40px;">
    <div class="col-1">&nbsp;</div>
    <div class="col-2 text-center">
        <img style="width:100%;" src="./images/iconEffects.png" />
        <span><a href="#" title="See the features.">Look</a> | <a href="#" title="See the documentation.">Learn</a> | <a href="#" title="Use the application.">Use</a></span>
    </div>
    <div class="col-6">
        <strong>Effects</strong> is a tool to create visual effects as parametrized modifiers of game objects, and have their values edited at runtime.
    </div>
    <div class="col-3">&nbsp;</div>
</div>

There may be more modules added in the future, but the current focus is squarely on filling out the tools in <span class="missing-super-link">the roadmap</span>. So, don't expect a cross-platform 3D modeling application from this suite. But suggestions are always welcome, so if you'd like to see an image optimizer, some audio tools, isometric 2D support, or something else, just <span class="missing-super-link">say the word</span>.

## Supported Platforms

This suite of game development tools will include several cross-platform modules, starting with Sprite Sheets v0.3.0 and Sprite Fonts v0.3.0 (preview). These modules will be bundled and released as: a desktop app, a command-line app, and a static web app that's hosted at [GameDevUtils.com](http://GameDevUtils.com/) which can be downloaded to run locally. The supported platforms are to include: Windows, MacOS, and Linux.

<img style="width: 50%; display: block; margin: 20px auto 20px;" src="./images/windows-mac-linux.png" alt="The supported OSes." />

If your platform isn't supported, you can still use the hosted static web application on any desktop operating system (with a modern web browser). Unfortunately, unsupported platforms are untested platforms. The code is written to be as OS-agnostic as possible, but there's no way to guarantee compatibility.

The supported browsers for the upcoming v0.3.0 release will include Chrome, Firefox, Edge,<sup>?</sup> and Opera. These are the browsers that support [Selenium](https://www.selenium.dev/) testing, minus Internet Explorer. The Microsoft browsers may make it in there yet. If not, they will likely be on the very short list of browsers to test manually.

## Supported Application Types

The static web application is probably what most people will choose. It doesn't require admin privileges. It gets updated automatically. And it doesn't take up any space on your computer. Almost all new feature development is done in the web app. The desktop and command-line apps use the same core logic as the static web app, allowing them to focus only on mapping the users' input to project configurations and image assets.

#### Static Web Application

The v0.2.0 release of GameDevUtils included the feature-complete static web app for the Sprite Sheets module. It was written in pure [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML), allowing support for all major web browsers and platforms. The app required zero config and no admin rights. Assets loaded into the app never left the user's computer.

The v0.3.0 edition of this module is being developed in [TypeScript](https://www.typescriptlang.org/), with [React](https://reactjs.org/) providing help with the UI. Unlike the previous release, this version of the module includes unit tests built on [Jest](https://jestjs.io/), and browser testing via [Selenium](https://www.selenium.dev/). v0.3.0 adds some unimplemented features, including: sprite aliasing, support for SVG files, sprite rotation, image optimization, and (if time permits) support for some number of non-web image formats.

#### Desktop Application

With an initial release of v0.3.0, the desktop app for the Sprite Sheets module will strive to build a cross-platform application that has feature parity with the static web app, including support for the same web-friendly file formats.

The new edition of the module is being developed in [TypeScript](https://www.typescriptlang.org/) and [Electron](https://www.electronjs.org/), using [React](https://reactjs.org/) for UI, and [Jest](https://jestjs.io/) for automated unit tests.

#### Console Application

With an initial release of v0.3.0, the command-line app for the Sprite Sheets module will strive to build a cross-platform application that has feature parity with the static web app, including support for the same web-friendly file formats.

The console app type is a powerful tool for scripted tasks. You can perform the same actions, process the same files, and produce the same output as with the web and desktop apps. This is handy for plugging into build pipelines, or having your artists populate a network folder which you use as a source for scripted builds.

The new edition of the module is being developed in [TypeScript](https://www.typescriptlang.org/) and [Node](https://nodejs.org/), using [Jest](https://jestjs.io/) for automated unit tests.