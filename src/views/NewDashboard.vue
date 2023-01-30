<template>
    <div class="dashboard">
        <div class="sidebar">

            <div class="sidebar-lid" v-if="!isMobile">
                <h1>Maestro</h1>
                <p>Choose a playlist below</p>
            </div>
            <div class="sidebar-playlist-container">
                <ul class="h-full">
                    <li v-for="i in 100">sasa</li>
                </ul>
            </div>
        </div>
        <div class="content"><h1>Content</h1></div>
    </div>
</template>

<script setup>
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core';

//Check for mobile
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smallerOrEqual('md');


</script>

<style scoped>
.dashboard{
    @apply bg-neutral-200 md:bg-emerald-200 h-screen overflow-y-scroll;
    @apply flex flex-col md:flex-row;
}
.sidebar{
    @apply w-full md:w-1/3 lg:w-1/4 h-1/6 md:h-screen overflow-hidden bg-red-200
}

.sidebar-lid{
    @apply bg-blue-200 p-3
}
.sidebar-playlist-container{
    @apply h-full overflow-y-scroll
}
</style>