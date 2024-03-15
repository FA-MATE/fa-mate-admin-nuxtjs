<template>
  <div class="relative w-full flex">
    <div v-if="label != undefined" class="whitespace-nowrap">
      {{ label }}
    </div>
    <div class="w-full max-h-8 overflow-visible relative">
      <div class="border bg-white">
        <div class="absolute w-6 border right-0 top-0 bg-white">
          <div v-if="isFocused" @click="focusChanged"><IconMagnifyMinus /></div>
          <div v-else @click="focusChanged"><IconMagnify /></div>
        </div>
        <div class="flex">
          <div class="overflow-hidden">
            <div class="text-left">
              <input
                v-if="isFocused"
                v-model="searchKeyword"
                type="text"
                placeholder="キーワードを入力"
                class="p-1"
                @keyup="searchKeywordChanged"
              />
            </div>
            <div class="min-h-8 max-h-8 max-w-full overflow-visible overflow-x-scroll flex">
              <DismissibleButton
                v-for="item in selectedItems"
                :key="item.id"
                :label="item[nameColumn]"
                :item="item"
                class="m-1"
                @dismiss="itemDismiss"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="relative bg-white overflow-auto">
        <SelectableListNode
          v-for="item in filteredItems"
          :key="item.id"
          :checked="isChecked(item)"
          :label="item[nameColumn]"
          :item="item"
          @check-changed="itemChecked"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DismissibleButton from './DismissibleButton.vue'
import SelectableListNode from './SelectableListNode.vue'
import IconMagnify from './icon/IconMagnify.vue'
import IconMagnifyMinus from './icon/IconMagnifyMinus.vue'

const searchKeyword = ref('')
const isFocused = ref(false)

const { selectedItems } = defineProps<{
  selectedItems: any
  filteredItems: any
  items: any
  nameColumn: string
  label?: string
}>()

const emits = defineEmits<{
  searchKeywordChanged: [searchKeyword: string]
  focusChanged: [isFocused: boolean]
  itemChecked: [e: Event, item: any]
  itemDismiss: [item: any]
}>()

function searchKeywordChanged(): void {
  emits('searchKeywordChanged', searchKeyword.value)
}

function focusChanged(e: any): void {
  emits('focusChanged', e.target.checked)

  if (!e.target.checked) {
    searchKeyword.value = ''
  }
  isFocused.value = !isFocused.value
}

function itemDismiss(item: any): void {
  emits('itemDismiss', item)
}

function itemChecked(e: any, item: any): void {
  emits('itemChecked', e, item)
}

function isChecked(item: any): boolean {
  return selectedItems.filter((l: any) => l.id == item.id).length > 0
}
</script>
