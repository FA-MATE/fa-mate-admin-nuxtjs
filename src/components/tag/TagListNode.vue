<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/tag_groups/' + tag.tagGroupId + '/tags/' + tag.id">{{ tag.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      {{ tag.name }}
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      {{ tag.orderNo }}
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <Button label="削除" color="red" @click="handleDeleteTag" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { TagType } from '~/types'
import { useTagsStore } from '~/stores/tag'
import Button from '~/components/ui-part/form/Button.vue'

const { deleteTag } = useTagsStore()
const props = defineProps<{ tag: TagType }>()

async function handleDeleteTag(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteTag(props.tag).then(() =>
    navigateTo({
      path: '/tag_groups/' + props.tag.tagGroupId,
    })
  )
}
</script>
