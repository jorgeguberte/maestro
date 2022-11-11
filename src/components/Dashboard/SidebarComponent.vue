<script setup>
defineProps(['user','playlists'])


</script>

<template>
    <div class="sidebarContainer w-1/5">
      <div class="sidebarLid h-1/3 pl-3 bg-red-300">
        <div class="w-20 h-20 bg-red-200 items-center flex justify-center text-5xl">M</div>
        <p class="mt-5 text-xl font-bold" v-if="!user">
            <i class="fa-solid fa-spinner animate-spin"></i>
        </p>
        <p class="mt-5 text-xl font-bold" v-if="user">Welcome to Maestro, {{user.display_name}}</p>
        <p class="mt-16">Select a playlist below to get the analysis</p>
      </div>
      <div class="sidebarContent h-2/3 overflow-y-scroll">
        <ul class="h-full pl-3 mt-3"> 
        <li v-if="playlists" v-for="playlist in playlists" :key="playlist.id">
          <a href="#" @click="$emit('selectPlaylist',playlist)">{{playlist.name}}</a>
        </li>
      </ul>
      </div>

    </div>
</template>



<style lang="scss" scoped>

</style>