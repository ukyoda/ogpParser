const axios = require('axios'),
      followRedirects = require('follow-redirects'),
      charsetConverter = require('./charsetConverter')
      ;

module.exports = function getContents(url, { headers = {} } = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    });
};
