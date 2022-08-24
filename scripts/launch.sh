#!/bin/bash
# usage (run from root): yarn launchyarn 
# exit when any command fails
set -e

if [ "$1" != "" ]; then
    # @FeatureRequest: first check if website exists to make it more fool-proof
    echo "YEAH. Creating website $1 "
    echo "Copy config/.env.template file to config/.env.staging.$1 and config/.env.production.$1"
    cp "config/.env.template" "config/.env.staging.$1"
    cp "config/.env.template" "config/.env.production.$1"
    echo "Copy .contentful.template.json file to .contentful.staging.$1.json and .contentful.production.$1.json"
    cp "config/.contentful.template.json" "config/.contentful.staging.$1.json"
    cp "config/.contentful.template.json" "config/.contentful.production.$1.json"
    cp "assets/style/auto-assurance.scss" "assets/style/$1.scss"
    cp -R "assets/style/images/auto-assurance" "assets/style/images/$1"
    echo "PLEASE CHECK CONFIG FILES IN CONFIG FOLDER AND SET VALUES"

    echo "Find your Delivery Token with command:"
    echo "contentful spaces list"
    echo "contentful space accesstoken list --space-id {your_space_id}" 
else
    echo "argument missing"
fi