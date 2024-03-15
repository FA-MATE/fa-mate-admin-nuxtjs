<template>
  <div class="flex">
    <TagGroupList :tag-groups="tagGroupsStore.tagGroupsStore.tagGroups" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
import { useTagsStore } from '~/stores/tag'

const tagGroupsStore = useTagsStore()
</script>
