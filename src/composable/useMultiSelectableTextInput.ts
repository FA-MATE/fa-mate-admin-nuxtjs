import { h, ref } from 'vue'
import SelectableTextInput from '~/components/ui-part/SelectableTextInput.vue'

export const useMultiSelectableTextInput = (items: any[], nameColumn: string): any => {
  const filteredItems = ref<any[]>([])

  function onSearchByKeyword(searchKeyword: string): void {
    filteredItems.value = items.filter((item) => item[nameColumn].includes(searchKeyword))
  }

  function onChangedInputTextFocus(isFocused: boolean): void {
    if (!isFocused) {
      filteredItems.value = []
    }
  }

  function onChangedItemSelectState(selectedItemIds: Ref<number[]>, e: any, item: any): void {
    if (e.target.checked) {
      selectedItemIds.value = [item, ...selectedItemIds.value]
    } else {
      selectedItemIds.value = selectedItemIds.value.filter((selectedItemId) => selectedItemId != item.id)
    }
  }

  function onDismissItem(selectedItemIds: Ref<number[]>, item: any): void {
    selectedItemIds.value = selectedItemIds.value.filter((selectedItemId) => selectedItemId != item.id)
  }

  const render = (): any => {
    return h(SelectableTextInput, {
      filteredItems: filteredItems.value,
      items,
      nameColumn,
      onSearchByKeyword,
      onChangedInputTextFocus,
      onChangedItemSelectState,
      onDismissItem,
    })
  }

  return defineComponent({ render })
}
