<template>
  <!--<div>
    <div class="flex mt-4">
      <img :src="track.track.album.images[0].url" class="w-12 h-12" />
      <div class="ml-4">
        <p class="font-bold">{{ track.track.name }}</p>
        <small>by {{ track.track.artists[0].name }}</small>
      </div>
    </div>
    
  </div>-->
  <!--<div class="flex mt-4">
    <div class="pr-2 w-2/5 flex flex-row">
      <img :src="track.track.album.images[0].url" class="w-12 h-12" />
      <p class="font-semibold ml-2">{{track.track.name}}<br><span class="font-normal">{{track.track.artists[0].name}}</span></p>
      
    </div>
    <div class=" w-3/5 mr-3">Track Audio Features</div>
  </div>-->

  <div class="flex pl-3 pr-3 ">
    <div class="w-2/5 bg-red-200 flex">
      <img :src="track.track.album.images[0].url" class="w-12 h-12" />
      <p class="font-semibold ml-2">
        {{track.track.name}}<br>
        <span class="font-normal">{{track.track.artists[0].name}}</span>
      </p>
    </div>
    <div class="w-3/5 bg-blue-200">{{track.track.analysis}}</div>
  </div>
</template>

<script setup>
defineProps(["track"]);
</script>

<style scoped></style>
