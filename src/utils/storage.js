/**
 * Storage二次封装
 * @author Ories
 */

import config from "../config/index.js"

export default {
  setItem(key, val) {
    console.log('3333 setItem', key, val)
    let storage = this.getStorage()
    console.log('storage', storage)
    storage[key] = val
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage))
  },
  getItem(key) {
    if(this.getStorage().hasOwnProperty(key)) {
      return this.getStorage()[key]
    } else {
      return {}
    }
  },
  getStorage() {
    // 注意点给个保底值，如果一开始没有命名空间
    return JSON.parse(window.localStorage.getItem(config.nameSpace) || "{}")
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage))
  },
  clearAll() {
    window.localStorage.clear()
  },
}
