import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// In your main.js or main.css
import 'tailwindcss/tailwind.css'

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

    app.mount('#app')
  }
})
