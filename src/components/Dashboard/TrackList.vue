<script setup>
import TrackComponent from "./TrackComponent.vue";
defineProps(["tracks"]);
</script>

<template>
  <ul class="mb-5 pt-8 pl-12">
    <TrackComponent v-for="track in tracks" :key="track.id" :track="track" />
  </ul>
</template>

<style lang="scss" scoped></style>
