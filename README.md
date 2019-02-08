# Phone Lookup Lib

## NPM lib to get information about operator and country of a number.

## How to install:
```
    npm i lookup-phone
                  
    yarn add lookup-phone
```

## Usage:

```js
    const lookup = require('lookup-phone')

    lookup(351913054547).then(data => {
        console.log(data) // e.g. Vodafone, Portugal
    })
```