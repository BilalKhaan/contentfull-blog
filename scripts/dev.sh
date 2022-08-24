#!/bin/bash
# exit when any command fails
set -e
if [ "$1" != "" ]; then
    yarn use $1
    nuxt
else
    echo "Environment missing. Usage: yarn dev production | yarn dev staging"
fi