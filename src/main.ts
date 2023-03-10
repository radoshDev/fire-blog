import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Loading } from 'quasar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebaseInit'

import App from './App.vue'
import router from './router'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import './styles/main.scss'

let isAuth: boolean
const app = createApp(App)

app.use(createPinia())
app.use(Quasar, {
  plugins: { Notify, Loading },
})

onAuthStateChanged(auth, () => {
  if (!isAuth) {
    app.use(router)
    app.mount('#app')
    isAuth = true
  }
})
