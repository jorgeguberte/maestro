<template>
    
</template>

<script>
import {useRouter, useRoute} from 'vue-router';
import {useSpotifyStore} from "../stores/SpotifyAPI";


export default {
    setup(){
        const router = useRouter();
        const route = useRoute();
        
        const spotifyStore = useSpotifyStore();
        const query_params = {};

        if(!route.query.error){
            //Format the query string
            const callback_payload = route.hash.slice(1).split('&');
            

            // Create a key value pair for each query param and store in a list
            callback_payload.forEach((item)=>{
                let new_item = item.split('=');
                query_params[new_item[0]] = new_item[1];                
            });

            //Setup the token
            spotifyStore.setToken(query_params).then(async()=>{
                //Get the user's profile
                const response = await spotifyStore.getEndpoint('me');
                if(!response){
                    //Got error from endpoint, redirect to login
                }else{
                    //Use response.data to populate spotifyStore.user
                    await spotifyStore.setUser(response);


                    router.push('/dashboard')




                }
                
            })


        }else{
            console.log('error');
            
        }
        

        
    

        return{
            query_params, spotifyStore
        }
    },
    methods:{
        redirect(path){
            this.$router.push(path);
        }
    }
}
</script>

<style scoped>


</style>