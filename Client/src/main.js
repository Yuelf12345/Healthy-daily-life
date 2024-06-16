import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import pinia from "./store/index";
import router from './router/index';
import 'element-plus/dist/index.css';
import locale from 'element-plus/es/locale/lang/zh-cn'
import './style.css'
import App from './App.vue'

createApp(App).use(pinia).use(router).use(ElementPlus,{locale}).mount('#app')
