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
function updateCache(day, params, res) {
  axios({
    url: conf.apiUrl,
    method: 'GET',
    params: params
  })
    .then(response => {
      let imgInfo = response.data['images'][0];
      LOCALCACHE[day] = imgInfo;
      sendRes(day, res);
    })
    .catch(error => {
      return console.error(error);
    })
};
function sendRes(day, res) {
  res.status(302);
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    updateCache(dayName, conf.params[dayName], res);
  } else {
    // 直接返回
    sendRes(dayName, res);
  };
});

// TODO yesterday - 不缓存

module.exports = router;
