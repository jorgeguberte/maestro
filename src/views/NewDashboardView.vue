<template>
    <div class="outer-container">
        <NewSidebarComponent/>
        <div class="main-container">Main</div>
    </div>
</template>

<script setup>
import NewSidebarComponent from '../components/New/NewSidebarComponent.vue';

</script>

<style scoped>
.outer-container{
    @apply w-full h-screen bg-red-200 flex flex-col lg:flex-row
}

</style>