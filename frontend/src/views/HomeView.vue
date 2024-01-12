<script setup lang="ts">
import BoxContainer from '@/components/BoxContainer.vue';
import HeaderView from '@/components/HeaderView.vue';
import router from '@/router';


const handleClick = () => router.push({name: 'login', replace: true})
</script>

<template> 
  <main class="bg-blue-50 w-screen h-screen overflow-hidden">
    <HeaderView />
    <BoxContainer />
  </main>
</template>
