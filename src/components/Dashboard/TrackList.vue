<script setup>
import TrackComponent from "./TrackComponent.vue";
import { usePlaylistStore} from "../../stores/PlaylistsStore";
import PlaylistHeader from "./PlaylistHeader.vue";


defineProps(["tracks"]);
const playlistStore = usePlaylistStore(); 



</script>

<template>
  <ul class="mb-5 pt-8">
    <TrackComponent v-for="track in tracks" :key="track.id" :track="track" />
  </ul>
</template>

<style lang="scss" scoped></style>
