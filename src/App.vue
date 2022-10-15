<script>
import Landing from './Landing.vue';
import {useSpotifyStore} from "./stores/SpotifyAPI";

export default{
  setup(){
    const spotifyStore = useSpotifyStore();
    return{spotifyStore}
  },
  async created(){
    // If local token already exists, check for validity
    if(localStorage.getItem('token')){
      const local_token = JSON.parse(localStorage.getItem('token'));
      const now = Date.parse(new Date())

      if(Date.parse(local_token.valid_until) > now){
        console.log('still valid');
      }else{
        //Alert user that the token has expired
        console.log('expired');
      }
     
     /* if(now > local_token.expiration){
        console.log('expired');
      }else{
        console.log('still valid')
      }*/

      //await this.spotifyStore.checkTokenValidity();
    }else{
      console.log('no token')
    }



  },
    components: {
        Landing
    }
}
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
