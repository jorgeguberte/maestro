import { createApp } from 'vue';
/*import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';*/

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createPinia } from 'pinia';
//import './style.css'
import './index.css'
import App from './App.vue'




import router from "./router";
/*const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

const firebaseApp = initializeApp(firebaseConfig);
*/
const pinia = createPinia()
const app = createApp(App)
//const analytics = getAnalytics(firebaseApp);
//const db = getFirestore(firebaseApp);


//app.config.globalProperties.$analytics = analytics;
app.use(pinia)
app.use(router)
app.mount('#app')
