<script setup>
import { usePlaylistStore } from '../../stores/PlaylistsStore';

const playlistStore = usePlaylistStore();

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

          <div class="w-2/5 grid grid-flow-col grid-cols-3 text-center place-items-center">
            
            <div class=" text-center w-full">
              <p class="text-2xl">{{playlistStore.key}}</p>
              <p class="text-sm">Predominant Key</p>
            </div>

            <div class="text-center w-full">
              <p class="text-xl">{{playlistStore.energy}}</p>
              <p class="text-sm">Avg. Energy</p>
            </div>
            
            <div class="text-center w-full">
              <p class="text-xl">{{playlistStore.danceability}}</p>
              <p class="text-sm">Avg. Danceability</p>
            </div>
          </div>
</template>



<style lang="scss" scoped>

</style>