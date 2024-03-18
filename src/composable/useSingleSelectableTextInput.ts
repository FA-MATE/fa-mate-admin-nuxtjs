import { h, ref } from 'vue'
import SelectableTextInput from '~/components/ui-part/SelectableTextInput.vue'

export const useSingleSelectableTextInput = (items: any[], nameColumn: string): any => {
  const filteredItems = ref<any[]>([])

  function onSearchByKeyword(searchKeyword: string): void {
    filteredItems.value = items.filter((item) => item[nameColumn].includes(searchKeyword))
  }

  function onChangedInputTextFocus(isFocused: boolean): void {
    if (!isFocused) {
      filteredItems.value = []
    }
  }

  function onChangedItemSelectState(selectedItems: Ref, e: any, item: any): void {
    if (e.target.checked) {
      selectedItems.value = [item]
    } else {
      selectedItems.value = []
    }
  }

  function onDismissItem(selectedItems: Ref): void {
    selectedItems.value = []
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
