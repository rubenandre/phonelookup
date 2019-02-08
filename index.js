const rp = require('request-promise')
const cheerio = require('cheerio')

/**
 * Verify if is a number
 * @param {*} number - Coming Input
 */

const validateNumber = number => {
    return (typeof number === "number")
}

/**
 * Get the info of a number
 * @param {number} number - Landline/Mobile Number
 */

async function getInfoNumber(number) {
    // Options for request-promise
    const options = {
        uri: 'https://phonenumber-lookup.info',
        body: `phone=${number}`,
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        transform: function (body) {
            return cheerio.load(body);
        }
    }

    let output;
    
    await rp(options)
        .then($ => {
            let country = $('tr:nth-of-type(7) td:nth-of-type(2)').text()
            let network = $('tr:nth-of-type(8) td:nth-of-type(2)').text()
            output = `${network}, ${country}`
        })

    return output
}

module.exports = async function lookup(number) {
    if (!validateNumber(number)) throw new TypeError('Please insert a number')
    return Promise.resolve(await getInfoNumber(number))
}