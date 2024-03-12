<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <p class="text-2xl" v-if="tag.id === undefined">タグ新規追加</p>
        <p class="text-2xl" v-else>タグ詳細</p>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="tag.id" label="ID" type="text" readonly />
            <InputTextField v-model="tag.tagGroupId" label="タググループID" type="text" />
            <InputTextField v-model="tag.name" label="タグ名" type="text" />
            <InputTextField v-model="tag.orderNo" label="ソート順位" type="text" />
            <div class="flex justify-between" v-if="tag.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" :onClick="handlePostTag" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" :onClick="handleDeleteTag" />
              <Button label="修正" color="green" :onClick="handlePutTag" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { TagType } from '~/types'
  import { useTagsStore } from '~/stores/tag';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import Button from '~/components/ui-part/form/Button'

  const { getTags, postTag, putTag, deleteTag } = useTagsStore()

  const { tag } = defineProps<{tag: TagType}>();

  async function handlePostTag() {
    if(!confirm('新規追加しますか？')) return

    await postTag(tag)

    navigateTo({
      path: '/tag_groups/' + tag.tagGroupId
    });
  }

  async function handlePutTag() {
    if(!confirm('修正しますか？')) return
    
    await putTag(tag)

    navigateTo({
      path: '/tag_groups/' + tag.tagGroupId
    });
  }

  async function handleDeleteTag() {
    if(!confirm('削除しますか？')) return

    await deleteTag(tag)

    navigateTo({
      path: '/tag_groups/' + tag.tagGroupId
    });
  }
</script>