const AuthConfig = require('../config.js').auth

function isRelativeTimeNotation(string){
    if(typeof string !== 'string') return false;
    // Validate given string as a duration shorthand using the regex format in config
    const timeNotationFormat = AuthConfig.jwt.relativeTimeNotationFormat
    return timeNotationFormat.test(string)
}

function encodeURLString(url){
    if(typeof url === 'string'){ 
        // Encode only the specific characters that may cause issues in URL parsing
        url = url.replaceAll(/\/tr:/g, '/tr%3A')
    }
    return url;
}

module.exports = { isRelativeTimeNotation, encodeURLString }