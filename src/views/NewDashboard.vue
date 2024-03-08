<template>
    <div class="dashboard">
        <!-- playlist-picker will become a component and reactivity will occur internally to allow the user to pick a playlist from their collection; once they pick a playlist, perform analysis -->
        <div class="playlist-picker">
            <div>Pick a playlist</div>
        </div><!-- </playlist-picker>-->
        <div class="analysis-pane"><!-- shows the results of the analysis-->
            <h2>Here's what your playlist feels like, username:</h2><!-- placeholder text-->
            <ul><!-- inside this we show playlist analysis based on whatever metrics we come up with, in an user-friendly way with accessible copy -->
                <li>Energy: 0.5</li>
                <li>Danceability: 0.5</li>
                <li>Valence: 0.5</li>
                <li>Tempo: 0.5</li>
            </ul>
        </div><!-- </analysis-pane>-->
    </div>
</template>

<script setup>

</script>

<style scoped>
.dashboard{
    @apply bg-neutral-200 md:bg-yellow-100;
}
.playlist-picker{
    @apply bg-neutral-300 md:bg-yellow-200;
}
</style>