import { createRouter, createWebHistory } from "vue-router";


/**
* ⚠️ WARNING
* @author: @jorgeguberte
* @date: 2024-03-13T02:15:00.000Z (ISO 8601)
* Metadata:
* - component: index.ks
* - change: none
* - reason: non-applicable
*
* Description:
* The token check below has been deprecated and the token is now checked in NewDashboard.vue::storeToken().
*
* Potential Problems:
* - Token freshness: the new check uses different naming conventions and is not yet implemented.
* 
* Solution:
* - Homogenize the token check, adopting what's in NewDashboard.vue::storeToken().
*
* Improvement:
* - Visual map of routes, kinda like Swagger does for APIs. #insight #idea
*
**/
function isTokenValid() {
  //Check date
  return true;
}

function hasLocalToken() {
  const local_token = sessionStorage.getItem("token");
  if (!local_token) {
    console.log('No local token')
    return false;
  } else {
    const token = JSON.parse(local_token);

    const now = Date.parse(new Date());
    if (now > token.valid_until) {
      sessionStorage.removeItem("token");
      console.log('Token expired')
      return false;
    } else {
      //console.log('Token present and validated')
      return true;
    }
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/NewDashboard.vue"),
  },
  { path: "/login", name: "Login", component: () => import("../Landing.vue") },
  {
    path: "/auth/callback",
    name: "Callback",
    component: () => import("../views/CallbackView.vue"),
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/NewDashboard.vue"),
  },

  {
    path: '/labeler',
    name: "Labeler",
    component: ()=> import("../views/Labeler.vue")
  }



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  switch (to.name) {
    //If local token is present and valid, redirect to dashboard. Else, go to Landing and await user interaction.
    case "Home":
      if (hasLocalToken()) {
        next("/dashboard");
      } else {
        next();
      }
      break;

    //If local token is already present and valid, redirect to dashboard. Else, proceed to login and await user interaction.
    case "Login":
      if (hasLocalToken()) {
        next("/dashboard");
      } else {
        next();
      }
      break;

    //A local token is not expected here, since it is gonna be created by the callback.
    case "Callback":
      console.log("Token not expected.");
      //If query is empty, redirect to login.
      if(to.hash){
        //Has hash, check validity of data
        const query_params = {};
        const callback_payload = to.hash.slice(1).split("&");
        
        callback_payload.forEach((item) => {
          let new_item = item.split("=");
          query_params[new_item[0]] = new_item[1];
        });
        
        const now = Date.parse(new Date());
        const expiration_date = new Date();
        expiration_date.setMinutes(
          expiration_date.getMinutes() + Math.floor(query_params.expires_in / 60)
        );

        
        const token = {
          access_token: query_params.access_token,
          valid_until: Date.parse(expiration_date),
          state: query_params.state,
        }
        sessionStorage.setItem("token", JSON.stringify(token));
        next('/dashboard');
      }else{
        console.log('No hash. Redirect to login');
        next('/login');
      }
      
      break;

      //A local token is expected. If no valid token exists, redirect to login
    case "Dashboard":
      if(hasLocalToken()){
        next();
      }else{
        next({name: "Login"});
      }
      break;
      
    case "NewDashboard":
      next();
      break;
    case "Labeler":
      next();
      break;
      
    default:
      console.log("Default switch case."); //#NOTE: Possible edge case
      console.log(to.name);
  }
});
export default router;
