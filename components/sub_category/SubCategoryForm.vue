<script setup lang="ts">
import type { SubCategoryType } from '~/types'
import { useCategoriesStore } from '~/stores/category';

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

<template>
  <div class="p-4">
    <p class="text-2xl" v-if="subCategory.id === undefined">サブカテゴリ新規追加</p>
    <p class="text-2xl" v-else>サブカテゴリ詳細</p>
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto divide-y md:max-w-4xl">
        <div class="mt-8">
          <div class="grid grid-cols-1 gap-6">
            <label class="block">
              <span class="text-gray-700">カテゴリID</span>
              <input
                type="text"
                class="mt-1 block w-full p-1 rounded-md bg-gray-100"
                placeholder=""
                v-model="subCategory.categoryId"
                readonly
              />
            </label>
            <label class="block">
              <span class="text-gray-700">ID</span>
              <input
                type="text"
                class="mt-1 block w-full p-1 rounded-md bg-gray-100"
                placeholder=""
                v-model="subCategory.id"
                readonly
              />
            </label>
            <label class="block">
              <span class="text-gray-700">サブカテゴリ名</span>
              <input
                type="email"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder="サブカテゴリ名"
                v-model="subCategory.name"
              />
            </label>
            <label class="block">
              <span class="text-gray-700">ソート順位</span>
              <input
                type="number"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                v-model="subCategory.orderNo"
              />
            </label>
            <div class="flex justify-between" v-if="subCategory.id === undefined">
              <div></div>
              <button class="middle none center rounded-lg bg-green-500 py-1 px-3 font-sans text-xs font-bold text-white" @click="handlePostSubCategory">新規追加</button>
            </div>
            <div class="flex justify-between" v-else>
              <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white" @click="handleDeleteSubCategory">
                削除
              </button>
              <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-green-500 text-green-500 hover:bg-green-500 hover:text-white" @click="handlePutSubCategory">
                修正
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>