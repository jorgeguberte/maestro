<script setup>
import {ref, onMounted, reactive, onBeforeMount} from 'vue'
import { useSpotifyStore } from "../stores/SpotifyAPI";

const spotifyStore = useSpotifyStore();
spotifyStore.setToken();




const count = ref(0);
const state = reactive({
    user: null,
    playlists: [],
    playlists_error: false
});

spotifyStore.getEndpoint('/me').then((response) => {
  state.user = response
});




function fetchPlaylists(offset){
  //Get endpoint.
  const endpoint = `/me/playlists?offset=${offset}&limit=50`;
  spotifyStore.getEndpoint(endpoint).then(async(response)=>{
    if(!response){
      state.playlists_error = true;
    }else{
      state.playlists.push(...response.items);
      if(response.next){
        await fetchPlaylists(offset + 50);
      }else{
        console.log('Finished loading playlists');
        console.log(state.playlists.length)
      }
    }
  });
}

fetchPlaylists(0);

/*fetchPlaylistsPage(0).then(async(response)=>{
  if(!response){
    state.playlists = false;
    return false;
  }else{
    state.playlists = response.items;
  }

  fetchPlaylists();
})*/

/*

spotifyStore.getEndpoint('/me/playlists?limit=50').then(async (response) => {

  if(!response){
    state.playlists = false;
    return false;
  }else{
    console.log(response);
    if(response.next){
    }
    state.playlists = response.items;
  }
});


*/

function increaseCount(){
    count.value++;
}

onBeforeMount(async () => {
    state.user = await spotifyStore.getEndpoint('/me');
})
</script>

<template>
    <button @click="increaseCount">Count: {{count}}</button>
    <div>
        <p v-if="!state.user">loading user profile</p>
        <p v-if="state.user">{{state.user.display_name}}</p>
    </div>
    <div>
        <p v-if="state.playlists.length == 0 && !state.playlists_error">loading playlists</p>
        <p v-if="state.playlists_error ">error loading playlists</p>
    </div>
    <div v-if="state.playlists.length > 0">
      <ul>
        <li v-for="playlist in state.playlists" :key="playlist.id">
          {{playlist.name}}
        </li>
      </ul>
    </div>
</template>