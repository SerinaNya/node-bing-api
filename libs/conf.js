const config = require('../node-bing-api.config');
let baseUrl = config.originList[config.origin];
let params = {
  daily: {
    format: 'js',
    idx: 0,
    n: 1
  },
  yesterday:
  {
    format: 'js',
    idx: 1,
    n: 1
  }
};

module.exports = {
  apiUrl: `${baseUrl}/HPImageArchive.aspx`,
  baseUrl: baseUrl,
  params: params
};