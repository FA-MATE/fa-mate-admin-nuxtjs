<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div class="text-2xl" v-if="category.id === undefined">カテゴリ新規追加</div>
        <div class="text-2xl" v-else>カテゴリ詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="category.id" label="ID" type="text" readonly />
            <InputTextField v-model="category.name" label="カテゴリ名" type="text" />
            <InputTextField v-model="category.orderNo" label="ソート順位" type="number" />
            <div class="flex justify-between" v-if="category.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" :onClick="handlePostCategory" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" :onClick="handleDeleteCategory" />
              <Button label="修正" color="green" :onClick="handlePutCategory" />
            </div>
          </div>
        </div>

        <SubCategoryList :category="category" v-if="category.id != undefined" class="mt-6"/>        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types'
  import { useCategoriesStore } from '~/stores/category';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import Button from '~/components/ui-part/form/Button'

  const { category } = defineProps<{category: CategoryType}>();
  const { postCategory, putCategory, deleteCategory } = useCategoriesStore()

  async function handlePostCategory() {
    if(!confirm('新規追加しますか？')) return

    const newCategory = await postCategory(category)

    navigateTo({ path: '/categories/' + newCategory.id });
  }

  async function handlePutCategory() {
    if(!confirm('修正しますか？')) return

    await putCategory(category)
  }

  async function handleDeleteCategory() {
    if(!confirm('削除しますか？')) return

    await deleteCategory(category)

    navigateTo({ path: '/categories' });
  }
</script>