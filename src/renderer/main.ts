import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'virtual:uno.css'
import './style.css'
import 'tdesign-vue-next/es/style/index.css'

createApp(App).use(router).mount('#app')
