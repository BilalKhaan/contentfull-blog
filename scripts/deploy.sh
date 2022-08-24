#!/bin/bash
# exit when any command fails
set -e

if [ "$1" != "" ]; then
    yarn use $1
    vue-cli-service s3-deploy
    echo "Deployed $1"
else
    echo "environment missing. Usage: yarn deploy production | yarn deploy staging"
fi