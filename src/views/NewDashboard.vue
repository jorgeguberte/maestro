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
const results = ref([]); //Holds search results



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
    console.log("Not ok");
    return;
  }else{
    const data = await response.json();
    storeToken(data); //@jorgeguberte: storeToken() renames data to token_data
    return data.access_token;
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

</script>

<template>
    <div id="app" class="container mx-auto w-screen h-screen bg-red-200 flex flex-col">
      <header class="sticky top-0 z-10 p-4 bg-blue-200 h-fit text-center"> <h1 class="text-2xl font-bold">Maestro</h1>
        <p class="text-gray-600">Lorem ipsum dolor sit amet...</p> 
    </header>
    <div class="sticky top-16 p-4 text-center">
      <input v-model="query" type="text" placeholder="Search for a song on Spotify">
      <button @click="search">Search</button>
    </div>
    <div class=" overflow-y-auto max-h-[calc(100vh-12rem)] bg-orange-300 w-[screen]"><!-- results wrapper-->
      <div v-for="track in results" :key="track.id" class="w-full p-2 flex items-center gap-4 border cursor-pointer hover:bg-gray-100">
        <img  :src="track.album.images[2].url" alt="Album cover" class="w-16 h-16">
        <div>
          <h2>{{ track.name }}</h2>
          <p>{{ track.artists[0].name }}</p>
        </div>
      </div>

    </div>



    </div>
  </template>
  
<style scoped>
</style>