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
    }},

    {path: '/profile', name: 'Profile', component: ()=>import('../views/Profile.vue'), beforeEnter(to, from, next){
        //Route guard. No token, no access.
        if(!localStorage.getItem('access_token')){
            next('/signin');
        }else{
            next();
        }
    }},
    {path: '/dashboard', name: 'Dashboard', component: ()=>import('../views/Dashboard.vue'), beforeEnter(to, from, next){
        if(!localStorage.getItem('access_token')){
            next('/signin');
        }else{
            next();
        }
    }},
    {path: '/players', name: 'Players', component: ()=>import('../views/Players.vue'), beforeEnter(to, from, next){
        if(!localStorage.getItem('access_token')){
            next('/signin');
        }else{
            next();
        }
    }},
    {path: '/player', name: 'Player', component: ()=>import('../views/Player.vue'), beforeEnter(to, from, next){
        if(!localStorage.getItem('access_token')){
            next('/signin');
        }else{
            next();
        }
    }},
    {path: '/teams', name: 'Teams', component: ()=>import('../views/Teams.vue'), beforeEnter(to, from, next){
        if(!localStorage.getItem('access_token')){
            next('/signin');
        }else{
            next();
        }
    }},
    {path: '/reports', name: 'Reports', component: ()=>import('../views/Reports.vue'), beforeEnter(to, from, next){
        if(!localStorage.getItem('access_token')){
            next('/signin');
        }else{
            next();
        }
    }},*/

]


const router = createRouter({
    history: createWebHistory(),
    routes
  });


  


  
  export default router;