# exit when any command fails
set -e
backup-all () {
    EXPORTING_SPACE_ID3=$1
    contentful space export --space-id $EXPORTING_SPACE_ID3 --export-dir backup/full --download-assets  --include-drafts
    echo '✨ Content of space $EXPORTING_SPACE_ID3 successfully exported.'
}

backup-content-types () {
    EXPORTING_SPACE_ID=$1
    contentful space export --space-id $EXPORTING_SPACE_ID --export-dir backup/content-models content-model-only 
    echo '✨ Content of space $EXPORTING_SPACE_ID successfully exported.'
}

backup () {
    EXPORTING_SPACE_ID2=$1
    backup-content-types EXPORTING_SPACE_ID2
    backup EXPORTING_SPACE_ID2
}

backup-all v6lul3yomwxb
backup-all wqmv4fxyptx1
backup-all fevdkqsncftc
backup-all zvb86hyexb9j