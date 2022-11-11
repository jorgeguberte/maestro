<script setup>
import {ref, onMounted, reactive, onBeforeMount} from 'vue'
import { useSpotifyStore } from "../stores/SpotifyAPI";

import SidebarComponent from '../components/Dashboard/SidebarComponent.vue'

//Initiate the store
const spotifyStore = useSpotifyStore();
spotifyStore.setToken();




//Initialize the state
const state = reactive({
    user: null,
    playlists: [],
    playlists_error: false,
    selected_playlist: null,
    selected_playlist_status: false,
    selected_playlist_tracks: [],
    track_fetch_status: false,
    loading_playlist: false
});

//Get the user's profile
onBeforeMount(async () => {
    state.user = await spotifyStore.getEndpoint('/me');
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
        console.log(`Finished loading ${state.playlists.length} playlists`);
      }
    }
  });
}

//Fetch first page of playlists, 0 offset
fetchPlaylists(0);

async function fetchTracks(tracks_href){
  //Fetch track list
  const response = await spotifyStore.getEndpoint(tracks_href);
  if(!response){
    state.track_fetch_status = false;
    throw new Error('Couldnt fetch tracks')
  }else{
    state.selected_playlist_tracks = [...state.selected_playlist_tracks, ...response.items];
  }
  

  if(response.next){
    await fetchTracks(response.next);
  }else{
    state.track_fetch_status = true;
    state.loading_playlist = false;
    return true
  }
}

async function selectPlaylist(playlist){
  state.loading_playlist = true;
  state.selected_playlist = false;
  state.selected_playlist_status = false;
  state.selected_playlist_tracks = [];
  const tracks_fetch = await fetchTracks(playlist.tracks.href);
  if(!state.track_fetch_status){
    console.log('no')
  }else{
    state.selected_playlist  = playlist;
    state.selected_playlist_status = true;
  }


}






</script>

<template>
  <div class="dashboard__container">
    <SidebarComponent :user="state.user" :playlists="state.playlists" @selectPlaylist="(playlist_id)=>selectPlaylist(playlist_id)"/>


    <div class="dashboard__content">
      <div v-if="!state.selected_playlist">Select a playlist to get the analysis</div>
      <div v-if="state.loading_playlist">Loading</div>

      <div v-if="state.selected_playlist">
        <img :src="state.selected_playlist.images[0].url" class="w-48"/>
        <p class="text-3xl font-bold">{{state.selected_playlist.name}}</p>
        <small>by {{state.selected_playlist.owner.display_name }}</small>
        <p v-if="state.selected_playlist.description">{{state.selected_playlist.description}}</p>
        
        <ul class="mb-5">
          <li v-for="track in state.selected_playlist_tracks" v-bind:key="track.id">
            <div class="flex mt-4">
              <img :src="track.track.album.images[0].url" class="w-12"/>
              <div class="ml-4">
                <p class="font-bold">{{track.track.name}}</p>
                <small>by {{track.track.artists[0].name}}</small>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard__container{
  @apply bg-red-100 w-screen h-screen flex flex-row
}
.dashboard__content{
  @apply h-screen w-4/5 bg-green-100 overflow-y-scroll pl-3 pt-3
}
</style>