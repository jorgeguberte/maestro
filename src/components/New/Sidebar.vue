<template>
  <div class="flex flex-col md:w-1/3 lg:w-1/4">
    <!--cover-->
    <div class="sidebar-cover md:h-full p-3 flex bg-red-200">
      <h2>Hello! I'm Maestro</h2>
    </div>
    <!--items-->
    <div class="sidebar-items overflow-y-scroll">
      <ul>
        <li v-for="x in 100">sidebar: {{ x }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
