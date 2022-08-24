#!/bin/bash
# usage (run from root): yarn everything the-whole-world
# exit when any command fails
set -e

if [ "$1" == "the-whole-world" ]; then
    yarn everything auto-assurance
    yarn everything assurances-hospitalisations
    yarn everything devis-assurance-habitation
    yarn backup
    echo "Prepared and deployed staging & production of auto-assurance and assurances-hospitalisations and devis-assurance-habitation   "
elif [ "$1" != "" ]; then
    echo "YEAH. Checking out, preparing and deploying staging and production of website $1 "
    yarn checkout $1
    yarn warmup staging
    yarn deploy staging
    yarn warmup production
    yarn deploy production
else
    echo "argument missing"
fi