<script>

import { usePlaylistStore } from '../../stores/PlaylistsStore';

const playlistStore = usePlaylistStore();

export default{
  props: ['user','playlists'],
    setup() {

        return {
            playlistStore
        }
    },

    data(){
      return{
        active_playlist_id:'',
      }
    },
    methods:{
      setActive(playlist){
        this.active_playlist_id = playlist.id;
        this.$emit('selectPlaylist',playlist); 
      }
    },

}




</script>

<template>
    <div class="sidebarContainer w-1/5">
      <div class="sidebarLid h-1/3 pl-3 ">
        <div class="w-20 h-20 bg-neutral-900 text-neutral-100 items-center flex justify-center text-5xl">M</div>
        <p class="mt-5 text-xl font-bold" v-if="!user">
            <i class="fa-solid fa-spinner animate-spin"></i>
        </p>
        <div v-if="user">
          <p class="mt-5 text-xl font-bold">Welcome to Maestro, {{user.display_name}}</p>
          <p class="pt-10">Select a playlist below to get the analysis</p>
        </div>
      </div>
      <div class="sidebarContent h-2/3 overflow-y-scroll">
        <ul class="h-full pl-3 mt-3"> 
        <li v-if="playlists" v-for="playlist in playlists" :key="playlist.id">
          <a href="#" class="hover:font-semibold" :class="{active: this.active_playlist_id == playlist.id}" @click="setActive(playlist)">{{playlist.name}}</a>
        </li>
      </ul>
      </div>

    </div>
</template>



<style  scoped>
.active{
  @apply underline font-semibold
}
</style>