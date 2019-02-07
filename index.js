const rp = require('request-promise')
const cheerio = require('cheerio')
const store = require('store')

const validate = number => {
    return (typeof number === "number")
}

async function getData(number) {

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

    const string; 

    await rp(options)
        .then($ => {
            let country = $('tr:nth-of-type(7) td:nth-of-type(2)').text()
            let network = $('tr:nth-of-type(8) td:nth-of-type(2)').text()
            string = `${network}, ${country}`
        })

    return string
}

module.exports = async function lookup(number) {
    if (!validate(number)) throw new TypeError('Please insert a number')
    return Promise.resolve(await getData(number))
}