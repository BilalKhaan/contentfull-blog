#!/bin/bash
# exit when any command fails
set -e

if [ "$1" == "production" ]; then
    yarn use production
    nuxt start 
    echo "Starting production in SSR mode"

elif [ "$1" == "staging" ]; then
    yarn use staging
    nuxt start
    echo "Starting staging in SSR mode"

else
    echo "Please provide an environment. Usage: yarn start staging"
fi

echo "YARN START NOT LOOKING INTO RIGHT DIRECTORY, NEEDS FINETUNING"