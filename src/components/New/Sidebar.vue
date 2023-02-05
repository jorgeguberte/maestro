<template>
  <div class="flex flex-col sm:bg-red-200 md:w-1/3 lg:w-1/4">
    <!--cover-->
    <div class="sidebar-cover md:h-1/6 p-3 flex bg-red-200" v-if="!isMobile">
      <h2>Hello! I'm Maestro</h2>
    </div>
    <!--items-->
    <div class="sidebar-items lg:overflow-y-scroll sm:bg-purple-500 lg:bg-teal-600">
      <ul>
        <li v-for="x in 100">sidebar: {{ x }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smallerOrEqual("md");
</script>

<style scoped></style>
