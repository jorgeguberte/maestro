import { defineStore } from "pinia";
export const usePlaylistStore = defineStore("playlists", {
  state: () => {
    return {
      danceability: 0,
      energy: 0,
      key: "",
      tempo:0,
      valence:0,
      active_playlist_id: "",
      analysis_buffer: [],
    };
  },

  actions: {
    resetAnalysisBuffer() {
      this.analysis_buffer = [];
    }
  },
});
