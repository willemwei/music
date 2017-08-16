import jsonp from 'common/js/jsonp';
import {commonParam, options} from './config';
import axios from 'axios';

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  const data = Object.assign({}, commonParam, {
    g_tk: 1312469004,
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  });

  return jsonp(url, data, options);
}

export function search(query, page, zhida, perpage) {
  const url = 'api/getSearchSong';

  const data = Object.assign({}, commonParam, {
    g_tk: 5381,
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
