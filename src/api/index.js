/**
 * api 管理
 */

import request from "../utils/request.js"

export default {
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      // mock: false
    })
  }
}
