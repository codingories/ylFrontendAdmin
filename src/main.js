import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from "./router/index.js"

console.log("环境变量=>", import.meta.env)
const app = createApp(App);

app.use(ElementPlus)
app.use(router).mount('#app')
