<script>
import Landing from './Landing.vue';
import {useSpotifyStore} from "./stores/SpotifyAPI";

export default{
  setup(){
    const spotifyStore = useSpotifyStore();
    return{spotifyStore}
    
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
