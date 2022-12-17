<script setup>
import TrackComponent from "./TrackComponent.vue";
import { usePlaylistStore } from "../../stores/PlaylistsStore";
import { onBeforeMount } from "vue";

import { classifyTrack } from "../../use/useTrackClassifier";

const props = defineProps(["tracks"]);
const playlistStore = usePlaylistStore();

onBeforeMount(async () => {
  console.log("onBeforeMount");
  for (const track of props.tracks) {
    const trackClassification = await classifyTrack(track.track.analysis);
    track.track.analysis.mood = trackClassification[0].label;
  }
});
</script>

<template>
  <ul class="mb-5 pt-8">
    <TrackComponent v-for="track in tracks" :key="track.id" :track="track" />
  </ul>
</template>

<style lang="scss" scoped></style>
