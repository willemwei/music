import jsonp from 'common/js/jsonp';
import {commonParam, options} from './config';

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
