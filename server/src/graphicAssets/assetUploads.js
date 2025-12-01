const uploadConfig = require('../config.js').uploadThing
const crypto = require('crypto')
const SQIds = require('sqids')
const { uploadThing } = require('../config.js')


function createUploadURL(fileData){
    const searchParams = new URLSearchParams({expires: Date.now() + 60 * 60 * 1000})
    searchParams.append(uploadThing.urlSearchParamNames.UT_IDENTIFIER, process.env.APP_ID)
    searchParams.append(uploadThing.urlSearchParamNames.UT_FILE_NAME, fileData.name)
    searchParams.append(uploadThing.urlSearchParamNames.UT_FILE_SIZE, fileData.size)
    
    const fileKey = generateFileKey(fileData)
}


function generateFileKey(fileSeed){
    const randomHash = crypto.randomUUID().replace(/-/g, '')
    const encodedAppId = new SQIds({ randomHash, minLength: 12 })
        .encode(djb2())

    const uint8Array =  TextEncoder().encode(fileSeed)
    const encodedFileSeed = btoa(String.fromCharCode(...uint8Array.buffer))

    return `${encodedAppId}${encodedFileSeed}`
}

function djb2(s) {
    const h = 5381;
    let i = s.length;
    while (i) {
        h = (h * 33) ^ s.charCodeAt(--i);
    }
    return (h & 0xbfffffff) | ((h >>> 1) & 0x40000000);
}

function Upload(file, fileName){
    const searchParams = new URLSearchParams({expires: Date.now() + 60 * 60 * 1000})
    searchParams.append(uploadThing.urlSearchParamNames.UT_IDENTIFIER, )
    searchParams.append(uploadThing.urlSearchParamNames.UT_FILE_NAME, fileName)
    searchParams.append(uploadThing.urlSearchParamNames.UT_FILE_SIZE, )

    const fileKey = 'lkaj2sdf4kjsdfgo43gb9u4i9ohrgawe23466in2eri64g5p8vn0weucjh537b7'

    const url = new URL(
        `https://${uploadThing.regionAlias}.ingest.uploadthing.com/${fileKey}`
    )
    url.search = searchParams.toString()

    const res = await fetch(presigned.url, {
        method: 'PUT',
        body: formData
    })

    const signiture = "" // Create url signiture from the url and apiKey and add to search params
}