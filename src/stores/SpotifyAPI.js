import {defineStore} from 'pinia';
import axios from "axios";

axios.defaults.baseURL = 'https://api.spotify.com/v1/';



export const useSpotifyStore = defineStore('spotify', {
    state:()=>{
        return{
            count: 0,
            spotifyState: (Math.random() + 1).toString(36).substring(7),
            token: null,
            user: null
        }
    },
    actions: {
        getAuthURL(){
            const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const redirect_uri = import.meta.env.VITE_SPOTIFY_CALLBACK_URL;
            const scope = 'playlist-read-private user-read-private user-read-email';
            let url = 'https://accounts.spotify.com/authorize'
            url += '?response_type=token'
            url += '&client_id=' + encodeURIComponent(client_id)
            url += '&scope=' + encodeURIComponent(scope)
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
            url += '&state=' + encodeURIComponent(this.spotifyState);
            return url;
        },
        async setToken(){
            this.token = JSON.parse(sessionStorage.getItem('token'));//Retrieve token from local storage
            

            axios.defaults.headers.common = {'Authorization': `Bearer ${this.token.access_token}`}
        },

        async unsetToken(){
            delete this.token;
            delete axios.defaults.headers.common['Authorization'];
        },

        async getLocalStorage(){
            this.token = JSON.parse(sessionStorage.getItem('token'));
            this.user = JSON.parse(sessionStorage.getItem('user'));
        },
        async hasLocalToken(){
            const local_token = sessionStorage.getItem('token');
            console.log(local_token)
        },

        async getEndpoint(endpoint){
            //#TODO: Discard token if response is 401
            try{
                const response = await axios.get(endpoint);
                if(response.status == 200){
                    return response.data;
                }else{
                    throw new Error('Error getting endpoint');
                }
                
            }
            catch(error){
                return false;
            }
        },
    
        async setUser(user_data){
            this.user = user_data;
            sessionStorage.setItem('user', JSON.stringify(this.user));

        },

        async getPlaylists(){
            const playlists = await this.getEndpoint('me/playlists');
            return playlists;
        }
    },
    watch:{
        user(new_user_data){
            console.log('user has changed');
        }
    }
})