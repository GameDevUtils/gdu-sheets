#!/bin/sh

pushd src-core
npm link
popd
npm link gdu-core

ls -lfa
