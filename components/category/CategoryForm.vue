<template>
  <div class="p-4">
    <p class="text-2xl" v-if="category.id === undefined">カテゴリ新規追加</p>
    <p class="text-2xl" v-else>カテゴリ詳細</p>
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto divide-y md:max-w-4xl">
        <div class="mt-8">
          <div class="grid grid-cols-1 gap-6">
            <label class="block">
              <span class="text-gray-700">ID</span>
              <input
                type="text"
                class="mt-1 block w-full p-1 rounded-md bg-gray-100"
                placeholder=""
                v-model="category.id"
                readonly
              />
            </label>
            <label class="block">
              <span class="text-gray-700">カテゴリ名</span>
              <input
                type="email"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder="カテゴリ名"
                v-model="category.name"
              />
            </label>
            <label class="block">
              <span class="text-gray-700">ソート順位</span>
              <input
                type="number"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                v-model="category.orderNo"
              />
            </label>
            <div class="flex justify-between" v-if="category.id === undefined">
              <div></div>
              <button class="middle none center rounded-lg bg-green-500 py-1 px-3 font-sans text-xs font-bold text-white" @click="handlePostCategory">新規追加</button>
            </div>
            <div class="flex justify-between" v-else>
              <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white" @click="handleDeleteCategory">
                削除
              </button>
              <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-green-500 text-green-500 hover:bg-green-500 hover:text-white" @click="handlePutCategory">
                修正
              </button>
            </div>
            <!--
            <label class="block">
              <span class="text-gray-700">What type of event is it?</span>
              <select
                class="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              >
                <option>Corporate event</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Other</option>
              </select>
            </label>
            <label class="block">
              <span class="text-gray-700">Additional details</span>
              <textarea
                class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                rows="3"
              ></textarea>
            </label>
            <div class="block">
              <div class="mt-2">
                <div>
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                    />
                    <span class="ml-2">Email me news and special offers</span>
                  </label>
                </div>
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types'
  import { useCategoriesStore } from '~/stores/category';

  const { category } = defineProps<{category: CategoryType}>();
  const { postCategory, putCategory, deleteCategory } = useCategoriesStore()

  async function handlePostCategory() {
    if(!confirm('新規追加しますか？')) return

    const newCategory = await postCategory(category)

    navigateTo({ path: '/categories/' + newCategory.id });
  }

  async function handlePutCategory() {
    if(!confirm('修正しますか？' + category.id)) return

    await putCategory(category)
  }

  async function handleDeleteCategory() {
    if(!confirm('削除しますか？')) return

    await deleteCategory(category)

    navigateTo({ path: '/categories' });
  }
</script>