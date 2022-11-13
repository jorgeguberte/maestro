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
    loading_playlist: false,
    analysis_status: false,
    analysis_buffer: [],
    analysis_args: '',
    
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
    //console.log(response.items);
    for(const track of response.items){
      state.analysis_args += `${track.track.id},`;
    }

    //Fetch analysis

    const analysis_response = await spotifyStore.getEndpoint(`/audio-features?ids=${state.analysis_args}`);
    if(!analysis_response){
      throw new Error('Couldnt fetch analysis');
    }else{
      state.analysis_buffer = analysis_response;
    }



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
  /*Re-set the state*/
  state.loading_playlist = true;
  state.selected_playlist = false;
  state.selected_playlist_status = false;
  state.selected_playlist_tracks = [];
  state.analysis_buffer = [];
  state.analysis_args = '';


  const tracks_fetch = await fetchTracks(playlist.tracks.href);
  if(!state.track_fetch_status){
    console.log('no')
  }else{
    state.selected_playlist  = playlist;
    state.selected_playlist_status = true;
    state.analysis_status = 'loading';
    

    let playlist_danceability = 0;
    let playlist_energy = 0;
    const key_count = {}
    
    const keys_table = {0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'};

    let playlist_tempo = 0;

    for(const track of state.analysis_buffer.audio_features){
      playlist_danceability += track.danceability;
      playlist_energy += track.energy;
      key_count[track.key] = key_count[track.key] ? key_count[track.key] + 1 : 1;

      playlist_tempo += Math.ceil(track.tempo);
    }

    console.log(playlist_tempo)
    console.log(Math.floor(playlist_tempo/state.selected_playlist_tracks.length));
    //console.log(state.analysis_buffer)

    var key_count_index = 0;

    for(const el in key_count){
      if(key_count[el] > key_count_index){
        key_count_index = el;
      }
    }

    const playlist_key = keys_table[key_count_index];
    
    playlist_danceability = playlist_danceability / state.analysis_buffer.length;
    playlist_energy = playlist_energy / state.analysis_buffer.length;

    
   




    
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
        
        
        <div class="flex bg-blue-300 pl-12 pt-14 pb-12 sticky top-0">
          <img :src="state.selected_playlist.images[0].url" class="w-40"/>
          <div class="ml-4 pt-8">
            <p class="font-bold text-4xl">{{state.selected_playlist.name}}</p>
            <p>by {{state.selected_playlist.owner.display_name}}</p>

            <p class="mt-3">{{state.selected_playlist.description}}</p>
          </div>
          <div class="bg-red-300 w-3/5 ml-4 right-0 absolute ">
            <p v-if="state.analysis_status == 'loading'">Loading Playlist Analysis</p>
          </div>
        </div>


        <!--<img :src="state.selected_playlist.images[0].url" class="w-48"/>
        <p class="text-3xl font-bold">{{state.selected_playlist.name}}</p>
        <small>by {{state.selected_playlist.owner.display_name }}</small>
        <p v-if="state.selected_playlist.description">{{state.selected_playlist.description}}</p>-->
        
        <ul class="mb-5 pt-8 pl-12">
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
  @apply h-screen w-4/5 bg-green-100 overflow-y-scroll
}
</style>