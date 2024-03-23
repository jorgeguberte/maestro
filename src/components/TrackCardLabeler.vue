<script setup>
const props = defineProps(['docId','trackId', 'trackName','artistName','albumName','albumImage']);
//const availableLabels = ['Happy', 'Sad', 'Angry', 'Chill', 'Energetic'];
const availableLabels = ['Upbeat','Chill','Intense','Introspective'];
defineEmits(['assignMood', 'discardTrack']);
</script>

<template>
<div class="card lg:card-side bg-base-100 shadow-xl">
  <figure><img :src="props.albumImage" alt="Album"/></figure>
  <div class="card-body">
    <div class="justify-end card-actions">
      <button class="btn btn-ghost" @click="$emit('discardTrack', props.docId)"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    <h2 class="card-title">{{props.trackName}}</h2>
    <p>{{props.artistName}}<br>{{ props.albumName }}</p>

    <div class="card-actions justify-end">
      <button v-for="mood in availableLabels" class="btn btn-ghost" @click="$emit('assignMood', props.docId, mood)">{{ mood }}</button>
    </div>
  </div>
</div>

</template>

<style scoped></style>
