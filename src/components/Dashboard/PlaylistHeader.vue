<script setup>
import PlaylistAnalysis from './PlaylistAnalysis.vue'
import {ref, watch, onMounted} from 'vue'
defineProps(['img_url', 'playlist_name', 'playlist_owner', 'playlist_total_tracks', 'playlist_description', 'analysis_status','shrink']);


</script>


<template>
  
  <div class="playlist-header flex flex-row w-full pt-14 pb-12 sticky -top-5 pl-3 transition-all" :class="{'bg-red-200':!shrink, 'bg-green-200':shrink}">
    <img :src="img_url" :class="{'w-40':!shrink, 'h-40':!shrink, 'w-20':shrink, 'h-20':shrink}" class="rounded-full shadow-lg transition-all"/>
    <div class="playlist-info ml-4">
      <h1 class="text-3xl font-bold">{{ playlist_name }}</h1>
      <p class="text-gray-500">{{ playlist_owner }}</p>
    </div>
  </div>
  
  
  <!--<div class="playlist-header-container" :class="{'height-wrapper-expanded':!shrink, 'height-wrapper-shrunk': shrink}">
    <div :class="{'header-wrapper-expanded': !shrink,  'header-wrapper-shrunk':shrink}">
      <div>
        <img :src="img_url" :class="{'w-40':!shrink, 'h-40':!shrink, 'w-20':shrink, 'h-20':shrink}" />
      </div>
      <div>sasa</div>
    </div>
  </div>-->




  <!--<div class="flex border-b bg-white pl-12 pt-14 pb-12 sticky -top-10"></div>-->
  <!--<div class="header-wrapper-expanded">
    <img :src="img_url" class="w-40 h-40" />
    <div class="ml-4 pt-8 w-2/5">
      <p class="font-bold text-4xl">{{playlist_name}}</p>
      <p>by {{playlist_owner}}</p>
      <p>{{ playlist_total_tracks }} tracks</p>

      <p class="mt-3" v-if="playlist_description">{{playlist_description}}</p>
    </div>

    <PlaylistAnalysis v-if="analysis_status == 'loaded'"/>-->
  
</template>



<style scoped>
.playlist-header-container{
  @apply flex bg-blue-300 sticky  -top-8
}
.header-wrapper-expanded{
@apply bg-green-200 flex flex-row 
}
.header-wrapper-shrunk{
  @apply flex flex-row
}

.height-wrapper-expanded{
  @apply pt-14 pb-12 pl-10
}
.height-wrapper-shrunk{
  @apply pt-4 pb-4 pl-4
}

.playlist-header {
  background-color: #F5F5F5;
  border-bottom: 1px solid #E5E5E5;
}

.playlist-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
