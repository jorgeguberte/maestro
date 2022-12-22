<script setup>
import TrackComponent from "./TrackComponent.vue";
import { usePlaylistStore } from "../../stores/PlaylistsStore";
import { onBeforeMount } from "vue";

import { classifyTrack } from "../../use/useTrackClassifier";

const props = defineProps(["tracks"]);
const playlistStore = usePlaylistStore();

defineEmits(["sortPlaylist","parentFunction"]);

onBeforeMount(async () => {
  console.log("onBeforeMount");
  for (const track of props.tracks) {
    //console.log(track.added_at)
    const trackClassification = await classifyTrack(track.track.analysis);
    track.track.analysis.mood = trackClassification[0].label;
  }
});
</script>

<template>
  <button @click="$emit('sortPlaylist', {by:'key',order:'desc'})">Sort</button>
  <ul class="mb-5 pt-5">
    <div class="flex bg-red-200 flex-col ml-3 mr-3 items-end">
      <div class="w-1/5 bg-blue-200 flex flex-row text-center">
        <p class="w-1/3">Key<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="$emit('sortPlaylist', 'key')"></i></p>
        <p class="w-1/3">Tempo<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="$emit('sortPlaylist', 'tempo')"></i></p>
        <p class="w-1/3">Mood<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="$emit('sortPlaylist', 'mood')"></i></p>
      </div>
    </div>
    <TrackComponent v-for="track in tracks" :key="track.id" :track="track" />
  </ul>
</template>

<style lang="scss" scoped></style>
