<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <p class="text-2xl" v-if="subCategory.id === undefined">サブカテゴリ新規追加</p>
        <p class="text-2xl" v-else>サブカテゴリ詳細</p>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="subCategory.id" label="ID" type="text" readonly />
            <InputTextField v-model="subCategory.categoryId" label="カテゴリID" type="text" />
            <InputTextField v-model="subCategory.name" label="サブカテゴリ名" type="text" />
            <InputTextField v-model="subCategory.orderNo" label="ソート順位" type="text" />
            <div class="flex justify-between" v-if="subCategory.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostSubCategory" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" @click="handleDeleteSubCategory" />
              <Button label="修正" color="green" @click="handlePutSubCategory" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { SubCategoryType } from '~/types'
  import { useCategoriesStore } from '~/stores/category';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import Button from '~/components/ui-part/form/Button'

  const { getSubCategories, postSubCategory, putSubCategory, deleteSubCategory } = useCategoriesStore()

  const { subCategory } = defineProps<{subCategory: SubCategoryType}>();

  async function handlePostSubCategory() {
    if(!confirm('新規追加しますか？')) return

    await postSubCategory(subCategory)

    navigateTo({
      path: '/categories/' + subCategory.categoryId
    });
  }

  async function handlePutSubCategory() {
    if(!confirm('修正しますか？')) return
    
    await putSubCategory(subCategory)

    navigateTo({
      path: '/categories/' + subCategory.categoryId
    });
  }

  async function handleDeleteSubCategory() {
    if(!confirm('削除しますか？')) return

    await deleteSubCategory(subCategory)

    navigateTo({
      path: '/categories/' + subCategory.categoryId
    });
  }
</script>