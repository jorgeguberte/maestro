<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content">
      <h1>Content</h1>
      <p v-for="x in 200">content: {{ x }}</p>
    </div>
  </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import Sidebar from "../components/New/Sidebar.vue";

//Check for mobile
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smallerOrEqual("md");
</script>

<style scoped>
.dashboard {
  @apply bg-neutral-200 md:bg-emerald-200 h-screen;
  @apply flex flex-col md:flex-row;
}
.sidebar {
  @apply md:w-1/3 lg:w-1/4 h-1/6 md:h-full overflow-y-hidden;
}

.sidebar-lid {
  @apply p-3;
}
.sidebar-playlist-container {
  @apply h-full overflow-y-scroll;
}

.content {
  @apply h-full w-full overflow-y-scroll;
}
</style>
