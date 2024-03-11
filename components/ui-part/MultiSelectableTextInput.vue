
<template>
  <div class="relative w-full flex">
    <div v-if="label != undefined" class="whitespace-nowrap">
      {{ label }}
    </div>
    <div class="w-full max-h-8 overflow-visible relative">
      <div class="border bg-white">
        <div class="absolute w-6 border right-0 top-0 bg-white">
          <div @click="handleOnFocusChanged" v-if="isFocused"><IconMagnifyMinus /></div>
          <div @click="handleOnFocusChanged" v-else><IconMagnify /></div>
        </div>
        <div class="flex">
          <div class="overflow-hidden">
            <div class="text-left">
              <input type="text" v-model="searchKeyword" @keyup="handleOnChangeSearchKeyword" placeholder="キーワードを入力" class="p-1" v-if="isFocused" />
            </div>
            <div class="min-h-8 max-h-8 max-w-full overflow-visible overflow-x-scroll flex">
              <DismissibleButton 
                :label="item[nameColumn]"
                v-for="item in selectedItems"
                :item="item"
                :key="item.id"
                :handleOnDismiss="onItemDismiss"
                class="m-1" />
            </div>
          </div>
        </div>
      </div>
      <div class="relative bg-white overflow-auto">
        <SelectableListNode
          :checked="selectedItems.filter((l) => l.id == item.id).length > 0"
          :label="item[nameColumn]"
          v-for="item in filteredItems"
          :item="item"
          :key="item.id"
          :handleOnChangeChecked="onItemChecked" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import DismissibleButton from "./DismissibleButton.vue";
  import SelectableListNode from "./SelectableListNode.vue";
  import IconMagnify from "./icon/IconMagnify.vue";
  import IconMagnifyMinus from "./icon/IconMagnifyMinus.vue";

  const searchKeyword = ref('');
  const isFocused = ref(false);

  const { selectedItems, filteredItems, items, onChangeSearchKeyword, onFocusChanged, onItemChecked, onItemDismiss, nameColumn, label } = defineProps<{
    selectedItems: any,
    filteredItems: any,
    items: any,
    onChangeSearchKeyword: (searchKeyword: string) => void,
    onFocusChanged: (isFocused: boolean) => void,
    onItemChecked: (e: Event, item: any) => void,
    onItemDismiss: (item: any) => void,
    nameColumn: string,
    label?: string
  }>()

  function handleOnChangeSearchKeyword() {
    onChangeSearchKeyword(searchKeyword.value)
  }

  function handleOnFocusChanged(e){
    onFocusChanged(e.target.checked)
    if(!e.target.checked) {
      searchKeyword.value = ''
    }
    isFocused.value = !isFocused.value
  }
</script>