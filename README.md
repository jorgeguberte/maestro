# Maestro
Maestro is an app built with Vue.js that allows users to visualize their Spotify playlists in detail. It uses Spotify's Web API to authenticate the user following the Implicit Grant Flow; it then fetches the user's playlists and displays them in a list. When a playlist is selected, the tracks from that playlist are fetched, and an analysis is performed using a neural network to determine the individual mood of the tracks, and also to determine the overall mood of the playlist. It also uses some of the audio features parameters from the tracks to determine the median of each parameter for that playlist; those parameters are also displayed on the individual component for each track.

## Toolbox
* Spotify's REST API
* Vue.js 
	* Component and Options APIs
	* Composables
* Pinia
* TailwindCSS
* Storybook
* ml5.js (for the neural network analysis)
* Vite
* Vitest

### Roadmap
* LocalStorage, to avoid re-fetching data
* Larger test coverage
* Dashboard refactoring
* Export 
* Dark mode
* Routing / URL History
