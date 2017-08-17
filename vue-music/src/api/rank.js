import jsonp from 'common/js/jsonp';
import {commonParam, options} from './config';
import axios from 'axios';

export function getTopList() {
  const url = 'api/getTopL';
  const data = Object.assign({}, commonParam, {
    g_tk: '5381',
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';

  const data = Object.assign({}, commonParam, {
    g_tk: 1312469004,
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid
  });

  return jsonp(url, data, options);
}
