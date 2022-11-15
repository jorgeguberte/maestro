<template>
  <div>
    <div class="flex mt-4">
      <img :src="track.track.album.images[0].url" class="w-12" />
      <div class="ml-4">
        <p class="font-bold">{{ track.track.name }}</p>
        <small>by {{ track.track.artists[0].name }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["track"]);
</script>

<style lang="scss" scoped></style>
