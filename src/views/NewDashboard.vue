<script setup>
import { ref } from 'vue';
//import { useSpotifyStore } from '../stores/SpotifyAPI';
/**
* ⚠️ WARNING
* @author: @jorgeguberte
* @date: 2024-03-13T02:15:00.000Z (ISO 8601)
* Metadata:
* - component: NewDashboard.vue
* - change: authentication flow
* - reason: removed login prompt #ux-improvement
*
* Description:
* This view uses a different authentication flow than the one I used in SpofityAPI.js, removing the need for a login prompt.
*
* Edge Cases:
* isTokenExpired():
* - Clock Skew: The token expiration is checked by comparing the current time with the expiration time stored in the session storage. This could be a problem if the user's clock is not in sync with the server's clock.
* - Data Corruption: The token is stored in the session storage, which is not persistent. If the user closes the tab, the token is lost.
**/


const query = ref(''); //Holds query string
const results = ref([]); //Holds results from the search
const selectedResult = ref(null); //Holds the result selected by the user


const emit = defineEmits(['selectTrack']);

function storeToken(data) {
  // Store expiration time as well, for isTokenExpired()
  sessionStorage.setItem('spotifyToken', data.access_token);
  sessionStorage.setItem('spotifyTokenExpiration', Date.now()+data.expires_in*1000);
  
}

function isTokenExpired() {
  // Add logic to check token's expiration
  const expiration = sessionStorage.getItem('spotifyTokenExpiration');
  if(!expiration) return true;
  return Date.now() > expiration;
}

async function getSpotifyToken(){
  //This block checks if there's a token in the session storage
  let token = sessionStorage.getItem('spotifyToken');
  if(token  && !isTokenExpired(token)){
    return token;
  }
 
  const combinedCredentials = import.meta.env.VITE_SPOTIFY_CLIENT_ID+':'+import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  //If there's no token, or the token is expired, we request a new one
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(combinedCredentials)
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials'
    })
  });

  if(!response.ok){
    console.log("No results found. #TODO: Show message in the UI.");
    return;
  }else{
    const token_data = await response.json();
    storeToken(token_data); //@jorgeguberte: storeToken() renames data to token_data
    return token_data.access_token;
  }
  
}
/* SEARCH FUNCTION */

async function search(){
  if(!query.value) return;  
  //Format query string
  const encodedQuery = query.value.replace(' ', '%20');

  //Now we request a spotify token and make the search request
  await getSpotifyToken()
  .then(async(token)=>{
    //Check type of search. Only `artist` available for now.
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if(!response.ok){
      console.error("Show error message")
      return;
    }else{
      const data = await response.json();
      if(data.tracks.items.length > 0){
        results.value = data.tracks.items;
      }else{
        console.error("No results found");
      }


    }
  })
}













async function selectTrack(track){
  selectedResult.value = track;
  await getSpotifyToken()
  .then(async (token)=>{
    const response = await fetch (`https://api.spotify.com/v1/tracks/${track.id}`, {method:'GET', headers:{'Authorization':'Bearer '+token}});
    if(!response.ok){
      console.log("NOT OK");
      selectedResult.value = null;
      return;
    }else{
      const data = await response.json();
      selectedResult.value = data;
      /*
      * At this point the track is selected but not yet analyzed, 
      * so we need to display the basic info and a loader while we fetch the audio features.
      */
     analyzeTrack();
    }
  })
}



async function analyzeTrack(){
  // Check if track is actually selected
  if(!selectedResult.value) return;
  // Fetch audio features
  await getSpotifyToken()
  .then(async (token)=>{
    const response = await fetch (`https://api.spotify.com/v1/audio-features/${selectedResult.value.id}`, {method:'GET', headers:{'Authorization':'Bearer '+token}});
    if(!response.ok){
      console.log("NOT OK");
      return;
    }else{
      const data = await response.json();
      console.log(data);
    }
  });
  //
  
}
















</script>





















<template>
    <div id="app" class="container mx-auto w-screen h-screen bg-red-200 flex flex-col">
      <header class="sticky top-0 z-10 p-4 bg-blue-200 h-fit text-center"> <h1 class="text-2xl font-bold">Maestro</h1>
        <p class="text-gray-600">Lorem ipsum dolor sit amet...</p> 
        <p v-if="selectedResult">{{selectedResult.id}}</p>
      </header>
      <!-- SearchBar -->
      <div class="sticky top-16 p-4 text-center">
      <input v-model="query" type="text" placeholder="Search for a song on Spotify">
      <button @click="search">Search</button>
    </div>

    <!--SEARCH RESULTS-->
    <div v-if="results.length > 0 && !selectedResult" class=" overflow-y-auto max-h-[calc(100vh-12rem)] bg-orange-300 w-[screen]"><!-- results wrapper-->
      <div v-for="track in results" :key="track.id" class="w-full p-2 flex items-center gap-4 border cursor-pointer hover:bg-gray-100" @click="selectTrack(track)">
        <img  :src="track.album.images[2].url" alt="Album cover" class="w-16 h-16">
        <div>
          <h2>{{ track.name }}</h2>
          <p>{{ track.artists[0].name }}</p>
          <p>{{track.album.name}}</p>
        </div>
      </div>
    </div>




    </div>
  </template>
  
<style scoped>
</style>