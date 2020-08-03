const axios = require('axios'),
      charsetConverter = require('./charsetConverter')
      ;

module.exports = function getContents(url, { headers = {} } = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers }).then(res => {
            const data = charsetConverter(res.data);
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    });
};
