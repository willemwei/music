import jsonp from 'common/js/jsonp';
import axios from 'axios';
import {commonParam, options} from './config';

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

  const data = Object.assign({}, commonParam, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  });

  return jsonp(url, data, options);
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

  const data = {
    singermid: singerId,
    g_tk: 1199557927,
    uin: 1607074855,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 15,
    begin: 0
  };

  return new Promise((resolve, reject) => {
    axios.get('/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
      headers: {
        referer: 'https://y.qq.com/w/singer.html',
        origin: 'https://y.qq.com'
      },
      params: data
    }).then((res) => {
      resolve(res);
    });
  });
}
