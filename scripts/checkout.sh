#!/bin/bash
# usage (run from root):
# bash checkout.sh staging-auto-assurance 
# using yarn checkout is even better !
# exit when any command fails
set -e
if [ "$1" != "" ]; then
    yarn install
    echo "YEAH. Loading website $1 by updating environmental variable files"
    cp "config/.env.production.$1" "config/.env.production"
    cp "config/.env.staging.$1" "config/.env.staging"
    cp "config/.contentful.production.$1.json" "config/.contentful.production.json"
    cp "config/.contentful.staging.$1.json" "config/.contentful.staging.json"
    yarn use staging
else
    echo "argument missing. Usage: yarn dev staging | yarn dev production"
fi