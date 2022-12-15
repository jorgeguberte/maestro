<template>
  <div class="flex pl-3 pr-3 ">
    <div class="w-2/5 bg-red-200 flex">
      <img :src="track.track.album.images[0].url" class="w-12 h-12" />
      <p class="font-semibold ml-2">
        {{track.track.name}}<br>
        <span class="font-normal">{{track.track.artists[0].name}}</span>
      </p>
    </div>
    <div class="w-3/5 bg-blue-200">{{track_key}} <i class="fa-solid fa-spinner animate-spin" v-if="!track.track.analysis.mood"></i><span v-else>{{track.track.analysis.mood}}</span></div>
  </div>
</template>


<script setup>
import {ref} from 'vue';
import {useTrackKey, useTrackMood} from '../../use/useAudioFeatures';

const props = defineProps(["track"]);
const track_key = ref(useTrackKey(props.track.track.analysis));
const track_mood = ref(useTrackMood(props.track.track.analysis))
</script>

<style scoped></style>
