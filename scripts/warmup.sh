#!/bin/bash
# exit when any command fails
set -e

if [ "$1" == "production" ]; then
    yarn use production
    yarn generate 
    echo "Built production with prerendering. Ready to deploy"

elif [ "$1" == "staging" ]; then
    yarn use staging
    yarn build
    echo "Built staging in spa mode. Ready to deploy"

else
    echo "Please provide an environment. Usage: yarn warmup production"
fi