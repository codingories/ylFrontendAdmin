/**
 * Vuex状态管理
 */
import storage from "../utils/storage.js"
import mutations from './mutations.js'
import {createStore} from "vuex"

const state = {
  userInfo: "" || storage.getItem("userInfo")
}
export default createStore({
  state,
  mutations
})
