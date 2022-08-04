/**
 * Mutations业务层数据提交
 */
import storage from "../utils/storage.js"

export default {
  saveUserInfo(state, userInfo) {
    console.log('33333', userInfo)
    state.userInfo = userInfo
    storage.setItem("userInfo", userInfo)
  }
}
