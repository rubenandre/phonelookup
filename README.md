# Phone Lookup Lib

## NPM lib to get information about operator and country of a number.

## How to install:
```
    npm i phonelookup
                  or
    yarn add phonelookup
```

## Usage:

```js
    const lookup = require('./index')

    lookup(+351913054547).then(data => {
        console.log(data) // e.g. Vodafone, Portugal
    })
```