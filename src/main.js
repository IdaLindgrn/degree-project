import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
