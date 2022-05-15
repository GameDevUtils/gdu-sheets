# src-core

Core logic for importing and exporting project files, as well as publishing the final content files. Algorithms for manipulating and placing individual sprites. 

# NOTES

The following is a braindump so that I don't forget everything that went into this project.

## Dependencies

The following modules are used in the `sheets` apps.

* [node:buffer](https://nodejs.org/api/buffer.html#buffer) - node module, used for passing data and to encode/decode base64 strings
* [node:crypto](https://nodejs.org/api/crypto.html#crypto) - node module, used for sprite aliasing
* [uuid](https://www.npmjs.com/package/uuid) - MIT - a GUID generator
* [bmp-js](https://www.npmjs.com/package/bmp-js) - MIT - a BMP decoder
* [decode-gif](https://www.npmjs.com/package/decode-gif) - MIT - a GIF decoder, supports animated GIFs
* [jpeg-js](https://www.npmjs.com/package/jpeg-js) - BSD-3 - a JPG decoder
* [pngjs](https://www.npmjs.com/package/pngjs) - MIT - a PNG decoder
* [jszip](https://www.npmjs.com/package/jszip) - MIT - [de]compression lib
* [ndarray](https://www.npmjs.com/package/ndarray) - MIT - multidimensional arrays for raw image data
* [save-pixels](https://www.npmjs.com/package/save-pixels) - MIT - save images as jpg, gif, or png

## Research

* SVG ???
  * https://www.npmjs.com/package/svg-render ??? ISC
* https://raw.githubusercontent.com/groundh0g/FannyPack/master/assets/js/app/util/libgifparser.js (my original  code in fanny pack, MIT)

---------------------------------------------------

* Original GameDevUtils.com dependencies

    * base64 - a base64 encoder / decoder, compatible with atob() and btoa()
    * Blob - W3C Blob interface for browsers that do not support it
    * Bootstrap - a framework for faster and easier web development
    * crypto-js - an implementation of SHA256 and MD5 hashing
    * FileSaver - W3C FileSaver interface for browsers that do not support it
    * GitHub Pages - websites for you and your projects
    * Jekyll Bootstrap - The definitive Jekyll blogging framework
    * jQuery - a fast, small, and feature-rich JavaScript library
    * json2 - JSON feature for browsers that do not support it
    * jszip - create, read, and edit .zip files with Javascript
    * libgif.js - a modified version of @buzzfeed's & @shachaf's GIF parser
    * libgifparser.js - my lib, based on @buzzfeed's SuperGIF
    * object-keys.js - Object.keys for browsers that do not support it
    * string-helpers.js - contains, endsWith, ... for browsers without support
    * UUID - a JavaScript module to create GUIDs
    * MaxRectsBinPack.cpp - my JavaScript port of C++ source by Jukka Jylänki




