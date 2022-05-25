# gdu-sheets

A rewrite of the existing sheets app to distribute as static SPA, desktop app (via ElectronJS), and CLI.

## The Common Module

The common module contains all the core logic of the three apps.

### Build

Run the following from the repo root.

```shell script
pushd common && npm run build && popd
```

### Test

Run the following from the repo root.

```shell script
pushd common && npm run watch-all && popd
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

Run the following from the repo root to remove the common module from the other projects.

```shell script
./common-unlink.sh
```

## The CLI App

The cli folder contains the logic for the command-line app.

### Build

Run the following from the repo root.

```shell script
pushd cli && npm run build && popd
```

### Test

Run the following from the repo root.

```shell script
pushd cli && npm run watch-all && popd
```

## The Web App and the Desktop App

The web-desk folder contains the logic for the web and desktop apps.

### Build

Run the following from the repo root.

```shell script
pushd web-desk && $(npm run clean-web) && npm run build-web && popd
```

### Test

Run the following from the repo root.

```shell script
pushd web-desk && $(npm run clean-web) && npm run build-web && popd
```

### Run Web

Run the following from the repo root.

```shell script
pushd web-desk && npm run start8088 && popd
```

### Run Desktop

Run the following from the repo root.

```shell script
pushd web-desk && npm run dev && popd
```
