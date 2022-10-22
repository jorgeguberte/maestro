import { createRouter, createWebHistory } from "vue-router";

/*
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
*/
//import { useApiStore } from "../stores/useApi";


const routes = [
    {path: '/', name: 'Home', component: ()=>import('../Landing.vue')},
    {path: '/login', name: 'Login', component: ()=>import('../Landing.vue')},
    //{path:'/auth/callback', name: 'Callback', component: ()=>import('../views/CallbackView.vue')},
    {path:'/auth/callback', name: 'Callback', component: ()=>import('../views/CallbackView.vue'), async beforeEnter(to, from, next){
        try{

        //If no error and no hash, redirect to login
        if(!to.query || !to.hash){
            console.log('Forbidden');
            throw new Error('Forbidden navigation');
        }

        //If query has an error, user denied access. Redirect to home.
        if(to.query.error){
            //redirect to login
            //next({name: 'Home'});
            throw new Error('Authentication error')
        }

        if(!to.hash){
            //next({name: 'Login'});
            throw new Error('Forbidden navigation');
        }
        
    }catch(error){
        next({name: 'Login'});
        return false;
        
    }
        
            /*
            * Build token for local storage
            */


            const query_params = {};
            const callback_payload = to.hash.slice(1).split('&');
            callback_payload.forEach((item)=>{
                let new_item = item.split('=');
                query_params[new_item[0]] = new_item[1];                
            });

            //Check token validity
            const now = Date.parse(new Date())
            const expiration_date = new Date();
            expiration_date.setMinutes(expiration_date.getMinutes() + (Math.floor(query_params.expires_in/60)));

            query_params.valid_until = Date.parse(expiration_date);


            localStorage.setItem('token', JSON.stringify(query_params));

            next({name: 'Dashboard'});

            
        

    }},

    


    
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