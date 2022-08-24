# exit when any command fails
set -e
EXPORTING_SPACE_ID=$1
IMPORTING_SPACE_ID=$2

contentful space export --space-id $EXPORTING_SPACE_ID --skip-roles --skip-content
CONTENTFUL_EXPORT_PATH=$(find . -name "contentful-export*.json")
echo '✨ Content successfully exported.'
echo 'Starting to import the content models ...'
contentful space import --space-id $IMPORTING_SPACE_ID --content-model-only --content-file $CONTENTFUL_EXPORT_PATH
rm $CONTENTFUL_EXPORT_PATH