import {defineStore} from 'pinia';
export const usePlaylistStore = defineStore('playlists',{
    state: () => {
        return{
            danceability:0,
            energy:0,
            key:''
        }
    },

    actions:{
    }

    
})