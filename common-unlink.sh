#!/bin/sh

pushd ./common/
$(npm unlink)
popd

pushd ./cli/
npm link gdu-common
$(npm unlink --no-save gdu-common)
popd

pushd ./web-desk/
npm link gdu-common
$(npm unlink --no-save gdu-common)
popd

#ls -lfa
