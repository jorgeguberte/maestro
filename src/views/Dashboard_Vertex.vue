<template>
  <div class="container">
    <div class="search-container">
      <input v-model="query" type="text" placeholder="Search for a song" class="search-input" />
      <button @click="search" class="search-button">Search</button>
    </div>

    <div v-if="results.length" class="results-container">
      <ul>
        <li v-for="result in results" :key="result.id" @click="selectResult(result)">
          {{ result.name }}
        </li>
      </ul>
    </div>

    <div v-else class="empty-results">
      No results found.
    </div>

    <div v-if="selectedResult" class="view-pane">
      <div class="track-name">{{ selectedResult.name }}</div>
      <div class="track-artist">{{ selectedResult.artists[0].name }}</div>
      <div class="track-album">{{ selectedResult.album.name }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useMutation } from 'pinia'

const spotifyApi = 'https://api.spotify.com/v1/search'

export default defineComponent({
  setup() {
    const query = ref('')
    const results = ref([])
    const selectedResult = ref(null)

    const search = useMutation(async () => {
      const response = await fetch(`${spotifyApi}?q=${query.value}&type=track`)
      const data = await response.json()
      results.value = data.tracks.items
    })

    return {
      query,
      results,
      selectedResult,
      search,
    }
  },
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #000;
  color: #fff;
}

.results-container {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.empty-results {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
}

.view-pane {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.track-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.track-artist {
  font-size: 1.2rem;
}

.track-album {
  font-size: 1.2rem;
}
</style>