<script>
    import { useSpotifyStore } from './stores/SpotifyAPI';

    

    export default {
        setup(){
            const spotifyStore = useSpotifyStore();
            const local_token = localStorage.getItem('token');
            
            if(!local_token){
                console.log('no local token, do nothing')
            }else{
                console.log('has local token, check for validity')
            }

            return{
                spotifyStore
            }
        },
    }
</script>
<template>
    <div class="landing__container">
    <h1 class="">Maestro</h1>
        <nav class="crumbs">
            <ol>
                <li><a v-bind:href="this.spotifyStore.getAuthURL()"> Login with Spotify</a></li>
            </ol>
        </nav>
    </div>
</template>


<style scoped>
    .landing__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
.crumbs ol {
    list-style-type: none;
    padding-left: 0;
}
.crumbs li{
    padding-top: 0.5em;
    font-size: 1.3em;
}
</style>