#!/bin/sh

pushd ../common
npm link
popd
npm link gdu-common

ls -lfa
