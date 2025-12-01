module.exports = {
    auth: {
        jwt: {
            tokenExpiryTime: '15m', // 15 minutes...
            relativeTimeNotationFormat: /^[1-9]\d*(s|m|h|d|w)$/,
        }
    },
    uploadThing: {
        regionAlias: 'sea1',
        urlSearchParamNames: {
            UT_FILE_TYPE: 'x-ut-file-type',
            UT_FILE_NAME: 'x-ut-file-name',
            UT_FILE_SIZE: 'x-ut-file-size',
            UT_IDENTIFIER: 'x-ut-identifier',
            UR_CUSTOM_ID: 'x-ut-custom-id'
        }
    }
}