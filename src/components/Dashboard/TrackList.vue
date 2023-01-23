<script setup>
import { ref } from "vue";
import TrackComponent from "./TrackComponent.vue";
import { usePlaylistStore } from "../../stores/PlaylistsStore";
import { onBeforeMount, onMounted , watch, reactive} from "vue";

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

onMounted(async()=>{
  const el = document.getElementsByClassName('tracklist-wrapper')[0];

  const rect =ref(el.getBoundingClientRect().top);
  

  watch(rect, (newVal, oldVal)=>{
    console.log('cxhanged')
  })
})

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

function isSortingBy(property){
  return playlist_sorting.by == property
}

function isSortingOrder(order){
  return playlist_sorting.order == order
}
</script>

<template>
  <div class="tracklist-wrapper">

    <div class="tracklist-sorting-controls  flex flex-row w-full  ">
      <div class="w-4/5 pl-4 text-sm flex justify-left place-items-center">Click on a column to sort</div>
      <div class="w-1/5 bg-neutral-200 flex text-xs">
        <div class="sorting-column-header-cell" :class="{'active-sorting':isSortingBy('key')}"  @click="sortPlaylist('key')">Key<i v-show="isSortingBy('key')" :class="{'fa-sort-up': isSortingOrder(true), 'fa-sort-down': isSortingOrder(false)}" class="fa-solid pl-1 text-xs text-neutral-600 cursor-pointer"></i></div>
        <div class="sorting-column-header-cell" :class="{'active-sorting':isSortingBy('tempo')}" @click="sortPlaylist('tempo')">Tempo<i v-show="isSortingBy('tempo')" :class="{'fa-sort-up': isSortingOrder(true), 'fa-sort-down': isSortingOrder(false)}" class="fa-solid pl-1 text-xs text-neutral-600 cursor-pointer"></i></div>
        <div class="sorting-column-header-cell" :class="{'active-sorting':isSortingBy('mood')}" @click="sortPlaylist('mood')">Mood<i v-show="isSortingBy('mood')" :class="{'fa-sort-up': isSortingOrder(true), 'fa-sort-down': isSortingOrder(false)}" class="fa-solid pl-1 text-xs text-neutral-600 cursor-pointer"></i></div>
      </div>

    </div>


    <ul class="w-full  flex flex-col gap-1">
      <TrackComponent v-for="track in props.tracks" :key="track.id" :track="track" />
    </ul>
  </div>

</template>

<style scoped>
.tracklist-wrapper{
  @apply flex flex-col justify-center  items-center
}
.tracklist-details-column-header{
  @apply w-1/3 flex justify-center place-items-center pb-1 hover:bg-gray-200 hover:cursor-pointer
}

.active-sorting{
  @apply bg-neutral-400 text-white
}

.sort-up{
  @apply bg-green-200
}

.sort-down{
  @apply bg-yellow-200
}

.sorting-column-header-cell{
@apply w-1/3 flex justify-center place-items-center text-sm pt-1 pb-2 hover:bg-zinc-400 hover:text-white  cursor-pointer
}
</style>
