<template></template>

<script>
import { useRouter, useRoute } from "vue-router";
import { useSpotifyStore } from "../stores/SpotifyAPI";

export default {
  setup() {
    const spotifyStore = useSpotifyStore();
    console.log('Do callback');
    return {
      spotifyStore,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
