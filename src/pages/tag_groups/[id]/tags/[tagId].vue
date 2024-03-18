<template>
  <TagForm v-model="tag" />
</template>

<script setup lang="ts">
import type { TagGroupType, TagType } from '~/types'
import { useTagsStore } from '~/stores/tag'

const route = useRoute()
const id = route.params.tagId
const tagGroupId = route.params.id

const {
  tagGroupsStore: { tagGroups },
} = useTagsStore()
const tagGroup = tagGroups.find((tagGroup: TagGroupType) => tagGroup.id == tagGroupId)

const initTag: TagType = {
  tagGroupId,
  name: '',
  orderNo: 0,
}

const tag = tagGroup?.tags?.find((tag: TagType) => tag.id == id) || initTag
</script>
