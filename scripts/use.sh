#!/bin/bash
# exit when any command fails
set -e

if [ "$1" != "" ]; then
    echo "Loading $1 environment"
    cp "config/.contentful.$1.json" ".contentful.json"
    cp "config/.env.$1" ".env"
else
    echo "argument missing"
fi