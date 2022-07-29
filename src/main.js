import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from "./router/index.js"
import axios from "axios"
import config from './config'
import request from "./utils/request.js"
// axios.get(config.mockApi + '/login').then((res)=>{
//   console.log('res', res)
// })

console.log("环境变量=>", import.meta.env)
const app = createApp(App);

app.use(ElementPlus)
app.config.globalProperties.$request = request
app.use(router).mount('#app')
