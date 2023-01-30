<template>
    <div class="dashboard">
        <div class="sidebar">

            <h1>Sidebar</h1>
            <div class="sidebar-lid" v-if="!isMobile">
                lid
            </div>
        </div>
        <div class="content"><h1>Content</h1></div>
    </div>
</template>

<script setup>
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobile = breakpoints.smallerOrEqual('md');
</script>

<style scoped>
.dashboard{
    @apply bg-neutral-200 md:bg-emerald-200 h-screen;
    @apply flex flex-col md:flex-row;
}
.sidebar{
    @apply w-full md:w-1/3 lg:w-1/4 h-1/6 md:h-full bg-red-200
}

.sidebar-lid{
    @apply bg-blue-200
}
</style>