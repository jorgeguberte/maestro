<script setup>
import TrackComponent from "./TrackComponent.vue";
import { usePlaylistStore } from "../../stores/PlaylistsStore";
import { onBeforeMount } from "vue";

import { classifyTrack } from "../../use/useTrackClassifier";

const props = defineProps(["tracks"]);
const playlistStore = usePlaylistStore();

defineEmits(["sortPlaylist","parentFunction"]);

onBeforeMount(async () => {
  for (const track of props.tracks) {
    //console.log(track.added_at)
    const trackClassification = await classifyTrack(track.track.analysis);
    track.track.analysis.mood = trackClassification[0].label;
  }
});

function sortPlaylist(by){
  if(by == 'default'){
    props.tracks.sort((a,b) => (a.track.added_at > b.track.added_at) ? 1 : ((b.track.added_at > a.track.added_at) ? -1 : 0))
  }else{
    props.tracks.sort((a,b) => (a.track.analysis['key'] > b.track.analysis['key']) ? 1 : ((b.track.analysis['key'] > a.track.analysis['key']) ? -1 : 0))
  }
  //props.tracks.sort((a,b) => (a.track.analysis[by] > b.track.analysis[by]) ? 1 : ((b.track.analysis[by] > a.track.analysis[by]) ? -1 : 0))
}
</script>

<template>
  <button @click="sortPlaylist('key')">Sort</button>
  <ul class="mb-5 pt-5">
    <div class="flex bg-red-200 flex-col ml-3 mr-3 items-end">
      <div class="w-1/5 bg-blue-200 flex flex-row text-center">
        <p class="w-1/3">Key<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="$emit('sortPlaylist', 'key')"></i></p>
        <p class="w-1/3">Tempo<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="$emit('sortPlaylist', 'tempo')"></i></p>
        <p class="w-1/3">Mood<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="$emit('sortPlaylist', 'mood')"></i></p>
      </div>
    </div>
    <TrackComponent v-for="track in props.tracks" :key="track.id" :track="track" />
  </ul>
</template>

<style lang="scss" scoped></style>
