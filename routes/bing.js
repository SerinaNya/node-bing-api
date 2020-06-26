const express = require('express');
const router = express.Router();
const axios = require('axios');

const conf = require('../libs/conf');
const checkTime = require('../libs/checkTime');

// LOCALCACHE
var LOCALCACHE = {
  daily: null,
  yesterday: null
};

// FUNCTIONS
function updateCache(day, params, callback) {
  axios({
    url: conf.apiUrl,
    method: 'GET',
    params: params
  })
    .then(response => {
      let imgInfo = response.data['images'][0];
      LOCALCACHE[day] = imgInfo;
      callback();
    })
    .catch(error => {
      return console.error(`Can not fetch ${conf.apiUrl}!`);
    })
};
function sendRes(day, res) {
  res.status(302);
  res.setHeader('Location', `${conf.baseUrl}${LOCALCACHE[day]['url']}`);
  res.send();
};

// daily - 缓存 JSON
router.get('/daily', (req, res, next) => {
  var dayName = 'daily';
  if (!LOCALCACHE[dayName] ||
    checkTime.isOutDated(LOCALCACHE[dayName]['fullstartdate'],
      LOCALCACHE[dayName]['enddate'])) {  // 1. 无缓存  2. 过期
    // 更新缓存
    updateCache(dayName, conf.params[dayName],
      () => {
        sendRes(dayName, res);
      });
  } else {
    // 直接返回
    sendRes(dayName, res);
  };
});

// TODO yesterday - 不缓存

module.exports = router;
