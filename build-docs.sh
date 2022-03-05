#!/bin/sh

pushd ./docs/docs/
jekyll clean
jekyll build

cd ../blog/
jekyll clean
jekyll build
popd