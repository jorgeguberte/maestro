<template>
    <div>
        Dashboard
    </div>
</template>

<script>
import {useSpotifyStore} from "../stores/SpotifyAPI";
import {useRouter} from 'vue-router';

    export default {
        setup(){
            const router = useRouter();
            const spotifyStore = useSpotifyStore();

            spotifyStore.getLocalStorage();

            //If no token, redirect to login
            if(!spotifyStore.token){
                router.push('/')
            }

            const playlists = spotifyStore.getPlaylists().then(()=>{console.log('got response')});

            return{
                spotifyStore
            }
        }
    }
</script>

<style scoped>

</style>