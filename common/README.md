# Sheets

Sheets is one of the apps in the http://gamedevutils.com/ suite of tools. It takes a collection of images and efficiently packs them into a single texture (sprite sheet), along with a mapping file (sprite atlas).

The `common` folder contains a module which holds all of the core logic used by all three apps (the static, single-page app; the command-line app; and the desktop app). All three apps should be usable on any platform that supports [Node.js](https://nodejs.org/) and the static web app should be accessible in any modern browser. (Sorry, IE 11.)

![Screenshot of the Sheets web application](../_assets/the-web-application-1.png)

## The Common Module

The common module contains all the core logic of the three apps.

### Build

Run the following from the 'common' folder to build the app.

```shell script
npm run build
```

### Test

Run the following from the 'common' folder to run the tests in watch mode, with coverage.

```shell script
npm run watch-all
```

### Install / Uninstall for All Three Apps

Run the following from the repo root to reset the node_modules links.

```shell script
./common-relink.sh
```

Run the following from the repo root to expose the common module to the other projects.

```shell script
./common-link.sh
```

Run the following from the repo root to cleanly remove the common module from the other projects.

```shell script
./common-unlink.sh
```

Once added, the consuming applications can reference the `common` module as if it had been installed via an `npm install` coomand.
