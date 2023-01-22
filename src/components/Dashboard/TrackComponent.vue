<template>
  <div class="flex pr-2 pl-2 pt-1 pb-1 group w-full">
    <div class="w-4/5  bg-neutral-100 group-hover:bg-neutral-200 flex">
      <img :src="track.track.album.images[0].url" class="w-12 h-12" />
      <p class="font-semibold ml-2">
        {{track.track.name}}<br>
        <span class="font-normal">{{track.track.artists[0].name}}</span>
      </p>
    </div>
    <!--<div class="w-2/5 bg-blue-200">{{track_key}} <i class="fa-solid fa-spinner animate-spin" v-if="!track.track.analysis.mood"></i><span v-else>{{track.track.analysis.mood}}</span></div>-->
    <div class="w-1/5 bg-neutral-200  group-hover:bg-neutral-300 flex place-items-center flex-row">
      <div class="flex flex-col p-2 text-center w-1/3">
        <div>{{useTrackKey(props.track.track.analysis)}}</div>
        <div class="text-xs">Key</div>
      </div>
      <div class="flex flex-col p-2 text-center w-1/3">
        <div>{{Math.ceil(track.track.analysis.tempo)}}</div>
        <div class="text-xs">BPM</div>
      </div>
      <div class="flex flex-col p-2 text-center w-1/3">
        <div class="text-xs">{{track.track.analysis.mood}}</div>
        <div class="text-xs">Mood</div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue';
import {useTrackKey} from '../../use/useAudioFeatures';

const props = defineProps(["track"]);
const track_key = ref(useTrackKey(props.track.track.analysis));

</script>

<style scoped></style>
