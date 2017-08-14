import jsonp from 'common/js/jsonp';
import {commonParam, options} from './config';
import axios from 'axios';

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  const data = Object.assign({}, commonParam, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    g_tk: 239709961
  });

  return jsonp(url, data, options);
}

export function getDiscList() {
  const url = '/api/getDiscList';

  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    needNewCode: 0,
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    rnd: Math.random(),
    g_tk: 5381
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

  const data = Object.assign({}, commonParam, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    g_tk: 1312469004,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  });

  return jsonp(url, data, Object.assign({}, options, {
    name: 'playlistinfoCallback'
  }));
}
