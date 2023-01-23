<script setup>
import { ref, onMounted, reactive, onBeforeMount } from "vue";
import { useSpotifyStore } from "../stores/SpotifyAPI";
import { usePlaylistStore } from "../stores/PlaylistsStore";

import SidebarComponent from "../components/Dashboard/SidebarComponent.vue";
import PlaylistHeader from "../components/Dashboard/PlaylistHeader.vue";
import TrackList from "../components/Dashboard/TrackList.vue";

//Initiate the store
const spotifyStore = useSpotifyStore();
spotifyStore.setToken();

const playlistStore = usePlaylistStore();

//Initialize the state
const state = reactive({
  user: null,
  playlists: [],
  playlists_error: false,
  selected_playlist: null,
  selected_playlist_status: false,
  selected_playlist_tracks: [],
  track_fetch_status: false,
  loading_playlist: false,
  analysis_status: false,
  analysis_buffer: [],
  analysis_args: "",
  sorting: { by: "default", order: "default" }, //default order. probably by date_added desc
  tracklist_shrink: false
});

//Data provided to the child components

//Get the user's profile
onBeforeMount(async () => {
  state.user = await spotifyStore.getEndpoint("/me");
});

function fetchPlaylists(offset) {
  //Get endpoint.
  const endpoint = `/me/playlists?offset=${offset}&limit=50`;
  spotifyStore.getEndpoint(endpoint).then(async (response) => {
    if (!response) {
      state.playlists_error = true;
    } else {
      state.playlists.push(...response.items);
      if (response.next) {
        await fetchPlaylists(offset + 50);
      } else {
        console.log(`Finished loading ${state.playlists.length} playlists`);
      }
    }
  });
}

//Fetch first page of playlists, 0 offset
fetchPlaylists(0);

async function fetchTracks(tracks_href) {
  state.analysis_args = ""; //Reset analysis url
  //Fetch track list
  const response = await spotifyStore.getEndpoint(tracks_href);
  if (!response) {
    state.track_fetch_status = false;
    throw new Error("Couldnt fetch tracks");
  } else {
    state.selected_playlist_tracks = [
      ...state.selected_playlist_tracks,
      ...response.items,
    ];
    //console.log(response.items);
    for (const track of response.items) {
      state.analysis_args += `${track.track.id},`;
    }

    //Fetch analysis

    const analysis_response = await spotifyStore.getEndpoint(
      `/audio-features?ids=${state.analysis_args}`
    );

    if (!analysis_response) {
      throw new Error("Couldnt fetch analysis");
    } else {
      //state.analysis_buffer.push(analysis_response.audio_features);
      for (const feature of analysis_response.audio_features) {
        state.analysis_buffer.push(feature);
      }
    }
  }

  if (response.next) {
    await fetchTracks(response.next);
  } else {
    state.track_fetch_status = true;
    state.loading_playlist = false;
    return true;
  }
}

async function selectPlaylist(playlist) {
  /*Re-set the state*/
  state.loading_playlist = true;
  state.selected_playlist = false;
  state.selected_playlist_status = false;
  state.selected_playlist_tracks = [];
  state.analysis_buffer = [];
  state.analysis_args = "";

  const tracks_fetch = await fetchTracks(playlist.tracks.href);
  if (!state.track_fetch_status) {
    console.log("no"); //#TODO: Handle error
  } else {
    state.selected_playlist = playlist;
    state.selected_playlist_status = true;

    state.analysis_status = "loading";

    let playlist_danceability = 0;
    let playlist_energy = 0;

    const key_count = {};

    const keys_table = {
      0: "C",
      1: "C#",
      2: "D",
      3: "D#",
      4: "E",
      5: "F",
      6: "F#",
      7: "G",
      8: "G#",
      9: "A",
      10: "A#",
      11: "B",
    };

    let playlist_tempo = 0;
    let playlist_valence = 0;
    let playlist_mode = 0;

    for (const track of state.analysis_buffer) {
      playlist_danceability += track.danceability;
      playlist_energy += track.energy;
      key_count[track.key] = key_count[track.key]
        ? key_count[track.key] + 1
        : 1;

      playlist_tempo += Math.ceil(track.tempo);

      playlist_valence += track.valence;

      playlist_mode += track.mode;
    }

    var key_count_index = 0;

    for (const el in key_count) {
      if (key_count[el] > key_count_index) {
        key_count_index = el;
      }
    }

    state.playlist_key = keys_table[key_count_index];

    state.playlist_danceability =
      playlist_danceability / state.analysis_buffer.length;
    state.playlist_energy = playlist_energy / state.analysis_buffer.length;

    playlistStore.key = keys_table[key_count_index];
    playlistStore.danceability = (
      playlist_danceability / state.analysis_buffer.length
    ).toFixed(2);
    playlistStore.energy = (
      playlist_energy / state.analysis_buffer.length
    ).toFixed(2);

    playlistStore.tempo = Math.floor(
      playlist_tempo / state.analysis_buffer.length
    );

    playlistStore.valence = (
      playlist_valence / state.analysis_buffer.length
    ).toFixed(1);

    playlistStore.mode =
      playlist_mode / state.analysis_buffer.length > 0.5 ? "Major" : "Minor";

    state.analysis_status = "loaded";

    playlistStore.resetAnalysisBuffer(); //empty the analysis buffer in the store so we can store the new data in it

    playlistStore.analysis_buffer = [...state.analysis_buffer];
    for (const track_index in state.selected_playlist_tracks) {
      state.selected_playlist_tracks[track_index].track.analysis =
        state.analysis_buffer[track_index];
    }
  }
}

function parentFunction(args){
  console.log('Parent function has been called successfully');
  console.log(args);
}


function sortPlaylist(args) {
  console.log(args)

  
  const el = args.by;
  const order = args.order;

  


  //if state.sorting.by == el, then we need to reverse the order
  
  if(state.sorting.by == el){
    state.selected_playlist_tracks.reverse();
  }else{
    /*
    * if state.sorting.by != el, then we need to sort by the new element
    */

    //if the new element is added_at or default, then we need to sort by the date
    if(el == 'added_at' || el == 'default'){
      if(order == 'asc'){
        state.selected_playlist_tracks = state.selected_playlist_tracks.sort((a,b) => (a.added_at > b.added_at) ? 1 : ((b.added_at > a.added_at) ? -1 : 0))
        
      }else{
        state.selected_playlist_tracks = state.selected_playlist_tracks.sort((a,b) => (a.added_at< b.added_at) ? 1 : ((b.added_at < a.added_at) ? -1 : 0))
      }
      
    }else{
      if(order == 'asc'){
        //if the new element is not added_at, then we need to sort by the value of the element
      state.selected_playlist_tracks = state.selected_playlist_tracks.sort((a,b) => (a.track.analysis[el] > b.track.analysis[el]) ? 1 : ((b.track.analysis[el] > a.track.analysis[el]) ? -1 : 0))
        //if the new element is not added_at, then we need to sort by the value of the element
      //state.selected_playlist_tracks = state.selected_playlist_tracks.sort((a,b) => (a.track.analysis[el] < b.track.analysis[el]) ? 1 : ((b.track.analysis[el ]< a.track.analysis[el]) ? -1 : 0))
      
    }
  }
}
  //console.log(el, order)

      //state.selected_playlist_tracks = state.selected_playlist_tracks.sort((a, b) => (a.track.added_at > b.track.added_at ? 1 : -1));

  
  //Change state of the sort order
  state.sorting = { by: el, order: order };
}


onMounted(async()=>{
  const el  = document.getElementsByClassName('dashboard__content')[0];

  el.addEventListener('scroll', (evt) => {
    let targetElement = document.getElementsByClassName('tracklist-wrapper')[0];
    let targetElement_top = targetElement.getBoundingClientRect().top;
    if(targetElement_top <= 0 && state.tracklist_shrink == false){
      state.tracklist_shrink = true;
    }

    if(targetElement_top >0){
      state.tracklist_shrink = false;
    }


  });

})


</script>

<template>
  <div class="dashboard__container">
    <SidebarComponent
      :user="state.user"
      :playlists="state.playlists"
      @selectPlaylist="(playlist_id) => selectPlaylist(playlist_id)"

    />

    <div class="dashboard__content">
      <!--<div v-if="!state.selected_playlist">Select a playlist to get the analysis</div>-->
      <div
        v-if="state.loading_playlist"
        class="flex justify-center items-center h-full flex-col"
      >
        <i class="fa-solid fa-spinner animate-spin"></i>
        <p class="pt-2">Loading Playlist</p>
      </div>

      <div v-if="state.selected_playlist">
<!--        <div class="flex border-b bg-white pl-12 pt-14 pb-12 sticky -top-10">-->
          <PlaylistHeader
            :img_url="state.selected_playlist.images[0].url"
            :playlist_name="state.selected_playlist.name"
            :playlist_owner="state.selected_playlist.owner.display_name"
            :playlist_total_tracks="state.selected_playlist.tracks.total"
            :playlist_description="state.selected_playlist.description"
            :analysis_status="state.analysis_status"
            :shrink="state.tracklist_shrink"
          />
        <!--</div>-->

        <!--Tracklist-->
        <TrackList :tracks="state.selected_playlist_tracks" @sortPlaylist="sortPlaylist" id="trackList"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard__container {
  @apply w-screen h-screen flex flex-row;
}
.dashboard__content {
  @apply h-screen w-4/5  overflow-y-scroll;
}
</style>
