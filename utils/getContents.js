const axios = require('axios'),
      followRedirects = require('follow-redirects'),
      charsetConverter = require('./charsetConverter')
      ;

module.exports = function getContents(url, redirectFlg=true, headers={}) {
    if (!redirectFlg) {
        console.warn('[Deprication Warning]: RedirectFlg is disabled. This Variable is remove at future version.');
    }
    return new Promise((resolve, reject) => {
        axios.get(url, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err);
        })
    });
};
