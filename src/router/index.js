import { createRouter, createWebHistory } from "vue-router";

/*
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
*/
//import { useApiStore } from "../stores/useApi";


const routes = [
    {path: '/', name: 'Home', component: ()=>import('../Landing.vue')},
    {path:'/auth/callback', name: 'Callback', component: ()=>import('../views/CallbackView.vue')},
    {path:'/dashboard', name: 'Dashboard',  component: ()=>import('../views/DashboardView.vue')},
    
    /*{path: '/logout', name: 'Logout', component: ()=>import('../views/Logout.vue'), async beforeEnter(to, from, next){
        const apiStore = useApiStore();
        const response = await apiStore.logout();
        if(response == true){
            next('/');
        }
    }},*/

]


const router = createRouter({
    history: createWebHistory(),
    routes
  });


  


  
  export default router;