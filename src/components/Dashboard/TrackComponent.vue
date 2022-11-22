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
  <div class="bg-red-200 flex mt-4">
    <div class="bg-blue-200 pr-2 w-2/5 flex flex-row">
      <img :src="track.track.album.images[0].url" class="w-12 h-12" />
      <p class="font-semibold ml-2">{{track.track.name}}<br><span class="font-normal">{{track.track.artists[0].name}}</span></p>
      
    </div>
    <div>Track Audio Features</div>
  </div>
</template>

<script setup>
defineProps(["track"]);
</script>

<style scoped></style>
