var express = require('express');
var config = require('./config/index');
var axios = require('axios');

var app = express();

var apiRouter = express.Router();

apiRouter.get('/getDiscList', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/playlist.html',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  });
});

apiRouter.get('/getTopL', function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/playlist.html',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  });
});

apiRouter.get('/getSearchSong', function (req, res) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/playlist.html',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  });
});

apiRouter.get('/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data;
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/;
      var matches = ret.match(reg);
      if (matches) {
        ret = JSON.parse(matches[1]);
      }
    }

    res.json(ret);
  }).catch((e) => {
    console.log(e);
  });
});

app.use('/api', apiRouter);

app.use(express.static('./dist'));

var port = process.env.PORT || config.build.port;

module.exports = app.listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://locahost:' + port + '\n');
});
