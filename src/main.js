import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// In your main.js or main.css
import 'tailwindcss/tailwind.css'
import Icon from './directives/icon'
import i18n from '@/includes/i18n'
import './assets/base.css'
import './assets/main.css'
import VeeValidatePlugin from '@/includes/validation'
import { auth } from '@/includes/firebase'

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin, {})
    app.directive('icon', Icon)
    app.use(i18n)
    app.mount('#app')
  }
})
