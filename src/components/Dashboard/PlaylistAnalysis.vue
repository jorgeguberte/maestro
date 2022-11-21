<script setup>
import { usePlaylistStore } from '../../stores/PlaylistsStore';

const playlistStore = usePlaylistStore();


function getValenceColor(valence){
  let valence_color, valence_icon;
  if(valence <= 0.2){
    valence_color = 'text-purple-900';
    valence_icon = 'fa-face-sad-tear';
  }else if(valence <= 0.4){
    valence_color = 'text-blue-600';
    valence_icon = 'fa-face-meh';
  }else if(valence <= 0.6){
    valence_color = 'text-green-300';
    valence_icon = 'fa-face-smile';
  }else if(valence <= 0.8){
    valence_color = 'text-green-500';
    valence_icon = 'fa-face-laugh-beam';
  
  }else{
    valence_color = 'text-green-500';
    valence_icon = 'fa-face-grin-stars';
  }

  

  return {'color': valence_color, 'icon':valence_icon};
}
</script>

<template>
          <!--<div class="w-3/5 ml-4 right-0 absolute ">
            <p v-if="state.analysis_status == 'loading'">Loading Playlist Analysis</p>
            <div v-if="state.analysis_status == 'loaded'" class="flex flex-row">
              <div  class="mr-4">Key<br> {{state.playlist_key}}</div>
              <div class="mr-4">Energy<br> {{state.playlist_energy.toFixed(2)}}</div>
              <div>Danceability <br> {{state.playlist_danceability.toFixed(2)}}</div>
            </div>
          </div>-->

          <div class="w-2/5 grid grid-flow-col grid-cols-5 text-center place-items-center">
            
            <div class=" text-center w-full">
              <p class="text-2xl">{{playlistStore.key}}</p>
              <p class="text-sm">Predominant Key</p>
            </div>

            <div class="text-center w-full">
              <p class="text-xl">{{playlistStore.tempo}}</p>
              <p class="text-sm">Avg. BPM</p>
            </div>

            <div class="text-center w-full">
              <p class="text-xl">{{playlistStore.energy}}</p>
              <p class="text-sm">Avg. Energy</p>
            </div>
            
            <div class="text-center w-full">
              <p class="text-xl">{{playlistStore.danceability}}</p>
              <p class="text-sm">Avg. Danceability</p>
            </div>

            <div class="text-center w-full" >
              <i class="fa-regular text-2xl" :class="getValenceColor(playlistStore.valence).icon, getValenceColor(playlistStore.valence).color"></i>
              <p class="text-sm">Mood</p>
            </div>
            
          </div>
</template>



<style lang="scss" scoped>

</style>