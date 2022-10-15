<template>
    <div>
        Dashboard
        {{playlists}}
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


            return{
                spotifyStore, playlists
            }
        }
    }
</script>

<style scoped>

</style>