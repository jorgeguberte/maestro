import { createRouter, createWebHistory } from "vue-router";


function isTokenValid() {
  //Check date
  return true;
}

function hasLocalToken() {
  //return localStorage.getItem("token") != null;
  const local_token = localStorage.getItem("token");
  if (!local_token) {
    console.log('No local token')
    return false;
  } else {
    const token = JSON.parse(local_token);

    const now = Date.parse(new Date());
    if (now > token.valid_until) {
      localStorage.removeItem("token");
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
    component: () => import("../Landing.vue"),
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
    component: () => import("../views/DashboardView.vue"),
  },

  {
    path: "/newdashboard",
    name: "NewDashboard",
    component: () => import("../views/NewDashboardView.vue"),
  },


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
        localStorage.setItem("token", JSON.stringify(token));
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
      
    default:
      console.log("Figure it out");
      console.log(to.name);
  }
});
export default router;
