#!/bin/sh

pushd ./common/
npm link
popd

pushd ./cli/
npm link gdu-common
popd

pushd ./web-desk/
npm link gdu-common
popd

#ls -lfa
