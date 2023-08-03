import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'

import './assets/main.css'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost/api/v1/'

app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)

app.mount('#app')
