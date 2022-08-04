// 环境配置封装
// 没有注入就是用生产的保底，如果忘记了发到线上也不会影响生产数据
const env = import.meta.env.MODE || 'prod'
console.log('env', env)
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/527b88f8a8bd29d65b8a0105f1945076/api'
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/527b88f8a8bd29d65b8a0105f1945076/api'
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: 'https://www.fastmock.site/mock/527b88f8a8bd29d65b8a0105f1945076/api'
  }
}
export default {
  env,
  mock: false,
  nameSpace: 'manager',
  ...EnvConfig[env]
}
