<template>
<div class="flex bg-white group hover:bg-neutral-200">
<div class="flex w-4/5 pt-2 pb-2">
  <div class="w-1/12 flex place-content-center">
    <img :src="track.track.album.images[0].url" class="w-12 h-12" />
  </div>
  <div class="w-11/12">
    <p class="font-semibold ml-2">
        {{track.track.name}}<br>
        <span class="font-normal">{{track.track.artists[0].name}}</span>
      </p>
  </div>
</div>
<div class="w-1/5  flex flex-row divide-x divide-neutral-200 group-hover:divide-zinc-200">
  <div class="track-detail-cell text-sm">{{useTrackKey(props.track.track.analysis)}}</div>
  <div class="track-detail-cell text-sm">{{Math.ceil(track.track.analysis.tempo)}}</div>
  <div class="track-detail-cell text-xs">{{track.track.analysis.mood}}</div>
</div>
</div>
</template>


<script setup>
import {ref} from 'vue';
import {useTrackKey} from '../../use/useAudioFeatures';

const props = defineProps(["track"]);
const track_key = ref(useTrackKey(props.track.track.analysis));

</script>

<style scoped>
.track-detail-cell{
  @apply w-1/3 flex justify-center place-items-center bg-neutral-100  group-hover:bg-neutral-300
}
</style>
