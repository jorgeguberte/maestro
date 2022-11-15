<script setup>
import PlaylistAnalysis from './PlaylistAnalysis.vue'
defineProps(['img_url', 'playlist_name', 'playlist_owner', 'playlist_total_tracks', 'playlist_description', 'analysis_status']);
</script>


<template>
  
    <img :src="img_url" class="w-40 h-40" />
    <div class="ml-4 pt-8 w-2/5 ">
      <p class="font-bold text-4xl">{{playlist_name}}</p>
      <p>by {{playlist_owner}}</p>
      <p>{{ playlist_total_tracks }} tracks</p>

      <p class="mt-3" v-if="playlist_description">{{playlist_description}}</p>
    </div>
    <!--PlaylistAnalysis-->
    <PlaylistAnalysis v-if="analysis_status == 'loaded'"/>
  
</template>



<style lang="scss" scoped></style>
