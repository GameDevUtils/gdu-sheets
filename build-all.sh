#!/bin/sh

pushd ./common/
npm run clean
npm run build
popd

pushd ./cli/
npm run clean-build
popd

pushd ./web-desk/
npm run clean-web
npm run build-web
# npm run clean-desk
# npm run build-desk
popd
