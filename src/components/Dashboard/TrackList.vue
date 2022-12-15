<script setup>
import TrackComponent from "./TrackComponent.vue";
import { usePlaylistStore} from "../../stores/PlaylistsStore";
import { onBeforeMount } from "vue";
//import PlaylistHeader from "./PlaylistHeader.vue";


const props = defineProps(["tracks"]);
const playlistStore = usePlaylistStore(); 

onBeforeMount(()=>{
//Neural network options
const nnOptions = {
  task: 'classification',
  debug: false
};

//Instantiate ml5 neural network
const nn = ml5.neuralNetwork(nnOptions);

//Initialize the model options
const modelInfo = {
  model: '/models/model.json',
  metadata: '/models/model_meta.json',
  weights: '/models/model.weights.bin',
}

//Load the model
nn.load(modelInfo, ()=>{
  for(const track of props.tracks){
    const nnInput = {
      valence: track.track.analysis.valence,
      energy: track.track.analysis.energy,
      danceability: track.track.analysis.danceability
    }
    nn.classify(nnInput, (error, results)=>{
      if(error){
        console.error(error);
        return;
      }
      track.track.analysis.mood = results[0].label;
    })
  }

})


});

/*function modelLoaded(){
  console.log('Model Loaded');
  for (const iterator of props.tracks) {
    iterator.bunda = 'suja'
  }
  console.log(props.tracks);
}

const nnInput = {
  valence: 0.1,
  energy: 0.5,
  danceability: 0.4
}


*/

</script>

<template>
  <ul class="mb-5 pt-8">
    <TrackComponent v-for="track in tracks" :key="track.id" :track="track" />
  </ul>
</template>

<style lang="scss" scoped></style>
