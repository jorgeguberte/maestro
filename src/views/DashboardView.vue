<script setup>
import {ref, onMounted, reactive, onBeforeMount} from 'vue'
import { useSpotifyStore } from "../stores/SpotifyAPI";

const spotifyStore = useSpotifyStore();
spotifyStore.setToken();




const count = ref(0);
const state = reactive({
    user: null,
    playlists: [],
    playlists_error: false,
    selected_playlist: null,
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

const playlist_buffer = [];

async function fetchPlaylistTracks(playlist_href){
  console.log(playlist_href)
  const response = await spotifyStore.getEndpoint(playlist_href);
  if(!response){
    console.log('Error fetching playlist tracks');
    return false;

  } else{
    console.log('all good')
  }
  playlist_buffer.push(...response.items);
  if(response.next){
    await fetchPlaylistTracks(response.next);
  }else{
    return playlist_buffer;
  }
}

async function selectPlaylist(playlist){
  //const tracks = await spotifyStore.getEndpoint(playlist.tracks.href);
  const tracks = await fetchPlaylistTracks(playlist.tracks.href).then(async (response)=>{
    if(!response){
      state.selected_playlist = null;
    }else{
      state.selected_playlist = playlist;
      console.log(response)
    }
    
  })
}






onBeforeMount(async () => {
    state.user = await spotifyStore.getEndpoint('/me');
})
</script>

<template>
  <div class="dashboard__container">
    <div class="h-full bg-blue-200 w-1/5 overflow-y-scroll">
      <div v-if="state.user">{{state.user.display_name}}</div>
      <ul> 
        <li v-for="playlist in state.playlists" v-bind:key="playlist.id">
          <a href="#" @click="selectPlaylist(playlist)">{{playlist.name}}</a>
        </li>
      </ul>
    </div>
    <div class="dashboard__content">
      <div v-if="!state.selected_playlist">Select a playlist to get the analysis</div>
      <div v-if="state.selected_playlist">
        <p>{{state.selected_playlist.name}}</p>
        <small>by {{state.selected_playlist.owner.display_name }}</small>
        <p v-if="state.selected_playlist.description">{{state.selected_playlist.description}}</p>
        <ul v-if="state.selected_playlist.tracks">
          <li v-for="track in state.selected_playlist.tracks" v-bind:key="track.id">
            <!--<p>
              <span v-for="artist in track.track.artists">{{artist.name}}</span>
            {{track.track.name}}
          </p>-->
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
  @apply h-screen w-4/5 bg-green-100
}
</style>