<script setup>
import { ref } from "vue";
import TrackComponent from "./TrackComponent.vue";
import { usePlaylistStore } from "../../stores/PlaylistsStore";
import { onBeforeMount } from "vue";

import { classifyTrack } from "../../use/useTrackClassifier";

const props = defineProps(["tracks"]);
const playlistStore = usePlaylistStore();

let tracksClassified = ref(false);

defineEmits(["sortPlaylist","parentFunction"]);

onBeforeMount(async () => {
  for (const track of props.tracks) {
    const trackClassification = await classifyTrack(track.track.analysis);
    track.track.analysis.mood = trackClassification[0].label;
  }

  tracksClassified.value = true;
  
});

const playlist_sorting = ref({by:'default', order: true});

function sortPlaylist(by){
  
  if(by == playlist_sorting.by){
    props.tracks.reverse();
  }else{
    if(by == 'default' || by == 'date_added'){
      props.tracks.sort((a,b) => (a.track.added_at > b.track.added_at) ? 1 : ((b.track.added_at > a.track.added_at) ? -1 : 0))
    }else{
      props.tracks.sort((a,b) => (a.track.analysis[by] > b.track.analysis[by]) ? 1 : ((b.track.analysis[by] > a.track.analysis[by]) ? -1 : 0))
    }
  }


  playlist_sorting.by = by;
  

  playlist_sorting.order = !playlist_sorting.order;

  
  
}


</script>

<template>
  <div class="tracklist-wrapper">
    <div class="tracklist-sorting-controls  flex flex-row w-full">
      <div class="bg-red-300 w-4/5 pl-2 pr-2">Sort by Default</div>
      <div class="flex text-xs bg-red-500 w-1/5 -ml-1">
      <div class="w-1/3">Key</div>
      <div class="w-1/3">Tempo</div>
      <div class="w-1/3">Mood</div>
    </div>
    </div>
    <ul class="w-full">
      <TrackComponent v-for="track in props.tracks" :key="track.id" :track="track" />
    </ul>
  </div>
<!--
  <ul class="mb-5 pt-5">
    <div class="flex bg-red-200 flex-col ml-3 mr-3 items-end">
      <div class="w-1/5 bg-blue-200 flex flex-row text-center">
        <p class="w-1/3">Key<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="sortPlaylist('key')"></i></p>
        <p class="w-1/3">Tempo<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="sortPlaylist('tempo')"></i></p>
        <p class="w-1/3">Mood<i class="fa-solid fa-sort pl-1 text-xs text-neutral-600 cursor-pointer" @click="sortPlaylist('mood')"></i></p>
      </div>
    </div>
    <TrackComponent v-for="track in props.tracks" :key="track.id" :track="track" />
  </ul>-->
</template>

<style scoped>
.tracklist-wrapper{
  @apply flex flex-col justify-center  items-center
}
</style>
