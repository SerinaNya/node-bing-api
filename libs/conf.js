const config = require('../node-bing-api.config');
let baseUrl = config.originList[config.origin];
module.exports = {
  apiUrl: `${baseUrl}/HPImageArchive.aspx`,
  baseUrl: baseUrl,
  params: {
    daliy: {
      format: 'js',
      idx: -1,
      n: 1
    },
    yesterday:
    {
      format: 'js',
      idx: 1,
      n: 1
    }
  }
};