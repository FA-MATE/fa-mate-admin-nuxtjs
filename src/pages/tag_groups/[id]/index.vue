<template>
  <div>
    <TagGroupForm v-model="tagGroup" />
  </div>
</template>

<script setup lang="ts">
import type { TagGroupType } from '~/types'
import { useTagsStore } from '~/stores/tag'

const route = useRoute()
const id = route.params.id

const { tagGroupsStore } = useTagsStore()
const initTagGroup: TagGroupType = {
  name: '',
  orderNo: 0,
  tags: [],
}
const tagGroup = tagGroupsStore.tagGroups.find((tagGroup: TagGroupType) => tagGroup.id == id) || initTagGroup
</script>
