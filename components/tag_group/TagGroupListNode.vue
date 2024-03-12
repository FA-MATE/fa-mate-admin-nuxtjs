<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/tag_groups/' + tagGroup.id">{{ tagGroup.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ tagGroup.name }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ tagGroup.orderNo }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <NuxtLink :to="'/posts?tagGroupId=' + tagGroup.id ">
        <Button label="関連投稿" color="orange" />
      </NuxtLink>
      <Button label="削除" color="red" :onClick="handleDeleteTagGroup" />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { TagGroupType } from '~/types'
  import { useTagsStore } from '~/stores/tag';
  import Button from '~/components/ui-part/form/Button'

  const { tagGroup } = defineProps<{tagGroup: TagGroupType}>();
  const { deleteTagGroup } = useTagsStore()

  async function handleDeleteTagGroup() {
    if(!confirm('削除しますか？')) return

    await deleteTagGroup(tagGroup)

    navigateTo({ path: '/tag_groups' });
  }
</script>