import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'virtual:uno.css'
import 'tdesign-vue-next/es/style/index.css'
import '@renderer/assets/style.css'

createApp(App).use(router).mount('#app')
