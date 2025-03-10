import { logService } from '@renderer/utils/logService'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'virtual:uno.css'
import 'tdesign-vue-next/es/style/index.css'
import '@renderer/assets/style.css'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, _, info) => {
  logService.error('unhandled error, catch by main.ts', {
    errorMessage: (err as Error).message,
    errorStack: (err as Error).stack,
    vueErrorInfo: info,
  })

  MessagePlugin.error('应用发生错误，请刷新页面或反馈至 github issues')
}

app.use(router).mount('#app')
