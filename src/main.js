import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style/index.scss'
import './assets/style/reset.css'
import App from './App.vue'
import router from "./router/index.js"
import request from "./utils/request.js"
import storage from "./utils/storage.js"
import store from "./store"
import QueryForm from "../packages/QueryForm/index.js"


import api from "./api"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {size: 'small'}).use(QueryForm)
app.use(store)

app.directive('has', {
  beforeMount: (el, binding) => {
    // 获取按钮权限
    let userAction = storage.getItem("actionList")
    let value = binding.value
    // 判断列表中是否有对应按钮权限标识
    let hasPermission = userAction.includes(value)
    if (!hasPermission) {
      el.style = "display:none"
      setTimeout(()=>{
        el.parentNode.removeChild(el)
      }, 0)
    }
  }
})

app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage

app.use(router).mount('#app')
