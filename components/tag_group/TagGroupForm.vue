<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div class="text-2xl" v-if="tagGroup.id === undefined">タググループ新規追加</div>
        <div class="text-2xl" v-else>タググループ詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="tagGroup.id" label="ID" type="text" readonly />
            <InputTextField v-model="tagGroup.name" label="タググループ名" type="text" />
            <InputTextField v-model="tagGroup.orderNo" label="ソート順位" type="number" />
            <div class="flex justify-between" v-if="tagGroup.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" :onClick="handlePostTagGroup" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" :onClick="handleDeleteTagGroup" />
              <Button label="修正" color="green" :onClick="handlePutTagGroup" />
            </div>
          </div>
        </div>

        <TagList :tagGroup="tagGroup" v-if="tagGroup.id != undefined" class="mt-6"/>        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { TagGroupType } from '~/types'
  import { useTagsStore } from '~/stores/tag';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import Button from '~/components/ui-part/form/Button'

  const { tagGroup } = defineProps<{tagGroup: TagGroupType}>();
  const { postTagGroup, putTagGroup, deleteTagGroup } = useTagsStore()

  async function handlePostTagGroup() {
    if(!confirm('新規追加しますか？')) return

    const newTagGroup = await postTagGroup(tagGroup)

    navigateTo({ path: '/tag_groups/' + newTagGroup.id });
  }

  async function handlePutTagGroup() {
    if(!confirm('修正しますか？')) return

    await putTagGroup(tagGroup)
  }

  async function handleDeleteTagGroup() {
    if(!confirm('削除しますか？')) return

    await deleteTagGroup(tagGroup)

    navigateTo({ path: '/tag_groups' });
  }
</script>