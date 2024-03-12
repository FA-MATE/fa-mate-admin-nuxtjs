<template>
  <div class="flex">
    <TagGroupList :tagGroups="tagGroupsStore.tagGroupsStore.tagGroups" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
  import type { TagGroupType } from '~/types'
  import { useTagsStore } from '~/stores/tag';

  const tagGroupsStore = useTagsStore()
</script>
