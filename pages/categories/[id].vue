<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
</script>

<template>
  <div class="flex">
    <CategoryList />
    <CategoryForm :id="id" />
  </div>
</template>
