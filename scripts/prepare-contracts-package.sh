#!/usr/bin/env bash

# cd to the root of the repo
cd "$(git rev-parse --show-toplevel)"

npm run prepack

cp README.md contracts/
cp -r build contracts/build
