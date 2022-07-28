// 环境配置封装
// 没有注入就是用生产的保底，如果忘记了发到线上也不会影响生产数据
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/31d6aeb803f3a5c2eff1de3301f3a1fc/api'
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/31d6aeb803f3a5c2eff1de3301f3a1fc/api'
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: ''
  }
}
export default {
  env,
  mock: true,
  ...EnvConfig[env]
}
