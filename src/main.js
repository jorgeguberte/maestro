

import { createApp } from 'vue';

import { createPinia } from 'pinia';
//import './style.css'
import './index.css'
import App from './App.vue'
import DummyComponent from './components/DummyComponent.vue';
import CallbackView from './views/CallbackView.vue';



import router from "./router";

const pinia = createPinia()
const app = createApp(App)


app.use(pinia)
app.use(router)
app.mount('#app')
