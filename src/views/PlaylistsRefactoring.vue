<script setup>
import { ref, onMounted, reactive, onBeforeMount } from "vue";
import { useSpotifyStore } from "../stores/SpotifyAPI";
import { usePlaylistStore } from "../stores/PlaylistsStore";

import SidebarComponent from "../components/Dashboard/SidebarComponent.vue";

const spotifyStore = useSpotifyStore();
spotifyStore.setToken();

const playlistStore = usePlaylistStore();

const state = reactive({
    user: null
})

onBeforeMount(async () => {
  state.user = await spotifyStore.getEndpoint("/me");
});
</script>