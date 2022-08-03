import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style/index.scss'
import './assets/style/reset.css'
import App from './App.vue'
import router from "./router/index.js"
import axios from "axios"
import config from './config'
import request from "./utils/request.js"
import storage from "./utils/storage.js"
// axios.get(config.mockApi + '/login').then((res)=>{
//   console.log('res', res)
// })
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


console.log("环境变量=>", import.meta.env)
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage

app.use(router).mount('#app')
