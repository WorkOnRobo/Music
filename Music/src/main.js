import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// In your main.js or main.css
import 'tailwindcss/tailwind.css'
import Icon from './directives/icon'
import i18n from '@/includes/i18n'
import { registerSW } from 'virtual:pwa-register'

import VeeValidatePlugin from '@/includes/validation'
import { auth } from '@/includes/firebase'
import GlobalComponents from './includes/_globals_js'
import progressBar from './includes/progress_bar'

import './assets/base.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

registerSW({ immediate: true })

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin, {})
    app.directive('icon', Icon)
    app.use(i18n)
    app.use(GlobalComponents)
    app.mount('#app')
  }
})
