<template>
<div class="wrapper"><!-- Outer wrapper-->
    <div class="sidebar">sidebar</div><!--left column-->
    <div class="content">content</div><!--left column-->
</div>
</template>

<script setup>

</script>

<style scoped>
.wrapper{
  @apply grid grid-flow-row lg:grid-flow-col;
  @apply w-screen h-screen;
}

.content{
  @apply bg-slate-400;
  @apply row-span-6
}
.sidebar{
  @apply  bg-slate-200  ;
  @apply order-last lg:order-first;
  @apply h-full lg:h-screen;
}
</style>
