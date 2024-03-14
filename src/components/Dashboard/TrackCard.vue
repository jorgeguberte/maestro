<template>
  <!--
        @ComponentName: TrackCard
        @Author: @jorgeguberte
        @Purpose: This component will display a single track card.
        @Considerations: 
            - Should the click event be handled here or emitted to the parent view?
        @Params: 
            - track: Object. The track object to be displayed, with the following properties being used internally:
                - name: String. The name of the track.
                - artist: String. The name of the artist who recorded the track.
                - album: String. The name of the album the track is from.
                - albumCover: String. The URL of the album cover image.
                - genres: Array. The genres of the track.
        @Layout:
            - Two columns, the first one with the album cover and the second one with the track name, artist and album name.
            - Two rows:
                - Top row with the album cover and the track details
                - Bottom row with genres (this is the hypnagogic flair, small hashtags that for now will show the genres of the song, but mood classification can go here too 🧑‍💻)
    -->

  <div class="">
    <div class="topRow">
      <img
        :src="track.album.images[2].url"
        alt="Album cover"
        class="w-16 h-16"
      />
      <div>
        <h2>{{ track.name }}</h2>
        <p>{{ track.artists[0].name }}</p>
        <p>{{ track.album.name }}</p>
      </div>
    </div>
    <div class="bottomRow">
        <p v-for="genre in track.genres" :key="genre">{{ genre }}</p>
    </div>
  </div>
</template>
