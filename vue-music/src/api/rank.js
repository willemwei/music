import jsonp from 'common/js/jsonp';
import {commonParam, options} from './config';
import axios from 'axios';

export function getTopList() {
  const url = 'api/getTopL';
  const data = Object.assign({}, commonParam, {
    g_tk: '1312469004',
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
