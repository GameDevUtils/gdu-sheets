---
layout: page
title: The Tech
permalink: /pages/about/technology/
---

<img src="/images/tech.jpg" style="float: right; margin-left: 20px; width:50%;" />One of the primary goals of this project is to provide a static web app, a desktop app, and a command-line app for every module in the suite. After reviewing several options, it was decided to go with JavaScript, which provides the most code reuse between platforms and operating systems, and is supported by countless free libraries.

## How is GameDevUtils Unique?

It's certainly not its features. The commercial offerings provide options and functionality that aren't (yet) supported in this suite of tools. The biggest benefits of this suite are that it's open source, and that it doesn't require you to install anything. 

If you prefer an application that runs on your machine, locally, you can download the desktop application or the command-line application for your OS.

#### Your Web Browser

When using static pages, everything runs in your browser. The technology that drives [GameDevUtils.com](http://gamedevutils.com/) is vanilla HTML5 and JavaScript. That means that you can use the app from any operating system, using any modern web browser. You don't have to be an administrator on your computer. You don't have to worry about updates.

#### Your Assets, Your Computer

There is no server component to [GameDevUtils.com](http://gamedevutils.com/). Assets are loaded into your browser, desktop app, or command-line app, from your local file system. Project files are loaded from and saved to your computer. Published resources are generated on and saved to your computer. Your data is never transmitted to a server. I don't need to see it, and I don't need to pay for dedicated servers that churn through data or bandwidth for that data to travel to and from those servers.

You can even download the static HTML and JavaScript, then run them on your computer&mdash;even without an internet connection.

#### Your Work, Your Team

Project files and published resources are generated as self-contained plaintext or compressed (ZIP DEFLATE) files. Resources are embedded in the project file, not linked. GameDevUtils embeds the source image data and configured options. Once assets have been added to the project, they're never referenced from your filesystem again. Share away. Just send the file via email, DropBox, GitHub, AirDrop, thumb drive, or however you normally share files with teammates.

#### The Static Web Application

The commercial offerings typically only provide desktop and (possibly) commandline applications. Those are both artifacts of this project. [GameDevUtils.com](http://gamedevutils.com/) also provides a way to run the same modules in your web browser. Zero install. Always up-to-date. No servers. Cross-browser support. Cross-platform support.

#### The Command-Line Application

One of the selling points of the commercial offerings is that they provide a command-line interface for their tools. As GameDevUtils modules are developed, automated tests are used to ensure the shared code performs as expected.

Why all the effort? I want to support build pipelines. Just plug some scripts into your favorite continuous integration solution and build your assets alongside your code!

#### The Desktop Application

Using ElectronJS, while avoiding CDN content, GameDevUtils can be implemented for the desktop of your favorite operating system. Tons of the core logic is shared between web, desktop, and command line. Electron allows the web and desktop applications to share the user interface layout and logic. 

#### **Roadmap**: The Cloud

The beauty of GameDevUtils.com is that there are no dependencies on the client. It's OS and, to a great extent, browser independent. Also nice is that your data need never leave your computer. That is, until you want to work with a team. If you think emailing ZIP files is clunky (I certainly do), then there's a new option coming your way soon!

You're probably already using one of the many popular cloud storage providers. If so, you can tell GameDevUtils.com to reference assets as file links rather than embedding those resources in the project files. That makes the project files smaller, and it makes it easier to edit an asset without having to remove it from the project and add it back.

I know what you're thinking ... Hey! GitHub and Bitbucket aren't cloud storage providers!

You're absolutely right. But, after the cloud storage support is in place, I hope to provide GitHub and BitBucket integration for the ultimate in team collaboration.

You're probably already using one of the many popular cloud storage providers. If so, you can tell GameDevUtils.com to reference assets as file links rather than embedding those resources in the project files. That makes the project files smaller, and it makes it easier to edit an asset without having to remove it from the project and add it back.

* Google Drive
* Dropbox
* OneDrive
* iCloud
* _GitHub_
* _Bitbucket_

I know what you're thinking ... Hey! GitHub and Bitbucket aren't cloud storage providers! You're absolutely right. But, after the cloud storage support is in place, I hope to provide GitHub and BitBucket integration for the ultimate in team collaboration.

## Libraries, Tools, and Resources

The following **Libraries, Tools, and Resources** are used in this project:

* [Bootstrap](https://getbootstrap.com/) is a collection of JavaScript/HTML/CSS components to create beautiful, responsive web applications. This project uses the CDN-served toolkit for the blog and documentation sites, and the locally-installed toolkit for the desktop and static web applications.
* [Bootstrap Icons](https://icons.getbootstrap.com/) is a library of vector icons. These glyphs are used sparingly throughout the project as button icons, as well as link and topic decoration. The majority of icons in this project come from Font Awesome.
* [Font Awesome](https://fontawesome.com/) is a gigantic library of vector icons, including many social logos. It also comes as a TTF that can be installed as a system font to be used in desktop applications. These glyphs are used throughout the project as button icons, as well as link and topic decoration.
* [jQuery](https://jquery.com/) is a JavaScript library that provides an easy-to-use interface to many common HTML/DOM/CSS/Ajax tasks in a cross-browser implementation. jQuery is required by Bootstrap, but is otherwise unused in this project.
* [React](https://reactjs.org/) is an open source JavaScript library from Facebook that aids in building and orchestrating UI components, making the management of front-end development easier. This library is used extensively throughout the project.
* [NodeJS](https://nodejs.org/) is a JavaScript library, built on Chrome's JavaScript engine. This library is used to build the command-line interface (CLI) or the applications in this project.
* [Electron](https://www.electronjs.org/) is a framework for building desktop applications using JavaScript, HTML, and CSS. Electron relies on NodeJS. This project uses ~~a, b, and c~~ to allow one common set of code to be used for the web, desktop, and command-line applications.

## JavaScript Modules

The following **JavaScript** modules are used in the web, desktop, and command-line applications:

* [base64](https://github.com/mathiasbynens/base64) is a base64 encoder / decoder, compatible with atob( ) and btoa( ).
* [crypto-js](https://code.google.com/p/crypto-js/#HMAC) is an implementation of SHA256 and MD5 hashing.
* [jszip](https://github.com/Stuk/jszip) provides a means to create, read, and edit .zip files with Javascript.
* [libgif.js](https://github.com/groundh0g/FannyPack/blob/master/assets/js/app/util/libgif.js) is a modified version of [@buzzfeed's & @shachaf's GIF parser](https://github.com/buzzfeed/libgif-js).
* [libgifparser.js](https://github.com/groundh0g/FannyPack/blob/master/assets/js/app/util/libgifparser.js) is my lib, based on [@buzzfeed's SuperGIF](https://github.com/buzzfeed/libgif-js).
* [UUID](http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136) is a JavaScript module to create GUIDs.
* [MaxRectsBinPacker.cpp](https://github.com/juj/RectangleBinPack/github) is the C++ source by Jukka Jylänki, upon which my JavaScript port is based.

The license for each of the listed modules should be either [MIT](https://choosealicense.com/licenses/mit/) or [Public Domain](https://wiki.creativecommons.org/wiki/public_domain). **This project is made available under the MIT license.**

## Temp Text 33

The following **Open Source** projects are used througout this project:

* [Base64](http://joehall.net/)

<div style="clear:both;"> </div>
