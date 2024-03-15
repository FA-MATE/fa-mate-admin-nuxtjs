

<template>
  <div class="relative w-full flex" @click.self="focusChanged">
    <div v-if="label != undefined" class="whitespace-nowrap">
      {{ label }}
    </div>
    <div class="w-full max-h-8 overflow-visible relative">
      <div class="border bg-white">
        <div class="absolute w-6 border right-0 top-0 bg-white">
          <div @click="focusChanged" v-if="isFocused"><IconMagnifyMinus /></div>
          <div @click="focusChanged" v-else><IconMagnify /></div>
        </div>
        <div class="flex">
          <div class="overflow-hidden flex-1">
            <div class="text-left">
              <input type="text" v-model="searchKeyword" @keyup="searchKeywordChanged" class="flex-1 p-1 w-full" v-if="isFocused" />
            </div>
            <div class="min-h-8 max-h-8 max-w-full overflow-visible overflow-x-scroll flex">
              <DismissibleButton 
                :label="selectedItem[nameColumn]"
                :item="selectedItem"
                v-if="selectedItem?.id != undefined"
                @dismiss="itemDismiss"
                class="m-1" />
            </div>
          </div>
        </div>
      </div>
      <div class="relative bg-white overflow-auto">
        <SelectableListNode
          :checked="selectedItem?.id == item.id"
          :label="item[nameColumn]"
          v-for="item in filteredItems"
          :item="item"
          :key="item.id"
          @check-changed="itemChecked" />
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

  defineProps<{
    selectedItem: any,
    filteredItems: any,
    items: any,
    nameColumn: string,
    label?: string
  }>()

  const emits = defineEmits<{
    searchKeywordChanged: [searchKeyword: string]
    focusChanged: [isFocused: boolean]
    itemChecked: [e: Event, item: any]
    itemDismiss: [item: any]
  }>()

  function searchKeywordChanged() {
    emits('searchKeywordChanged', searchKeyword.value)
  }

  function focusChanged(e){
    emits('focusChanged', e.target.checked)

    if(!e.target.checked) {
      searchKeyword.value = ''
    }
    isFocused.value = !isFocused.value
  }

  function itemDismiss(item) {
    emits('itemDismiss', item)
  }

  function itemChecked(e, item){
    emits('itemChecked', e, item)
  }
</script>
